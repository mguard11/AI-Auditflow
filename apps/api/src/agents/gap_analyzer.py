"""
Gap Analyzer Agent

Compares control mappings + evidence collected against a full framework
control list to identify coverage gaps and generate remediation suggestions.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from typing import Any

import structlog
from anthropic import AsyncAnthropic

from src.agents.mapper import ControlMapping
from src.lib.config import settings

logger = structlog.get_logger()

REMEDIATION_PROMPT = """You are a compliance expert. A company is missing evidence for the following control:

Framework: {framework}
Control ID: {control_id}
Control Description: {control_description}

Suggest 3 specific, actionable remediation steps to close this gap.
The suggestions should be practical for a 50-500 person company.

Return JSON only:
{{
  "suggestions": [
    {{"step": 1, "action": "...", "effort": "low|medium|high", "timeline": "1 week|1 month|1 quarter"}}
  ]
}}"""


@dataclass
class GapItem:
    control_id: str
    framework: str
    control_description: str
    severity: str  # critical | high | medium | low
    remediation_suggestions: list[dict[str, Any]] = field(default_factory=list)


@dataclass
class GapReport:
    audit_run_id: str
    gaps: list[GapItem]
    coverage_by_framework: dict[str, float]

    @property
    def gap_count(self) -> int:
        return len(self.gaps)


class GapAnalyzerAgent:
    def __init__(self, client: AsyncAnthropic) -> None:
        self.client = client

    async def run(
        self,
        control_mappings: list[ControlMapping],
        evidence_items: list[dict[str, Any]],
        framework_ids: list[str],
        audit_run_id: str,
    ) -> GapReport:
        from packages.audit_engine.frameworks import get_all_controls  # noqa: F401

        covered_controls: set[str] = set()
        for m in control_mappings:
            if m.confidence >= 0.6:
                covered_controls.add(f"{m.framework}:{m.control_id}")
        for e in evidence_items:
            if e.get("verified"):
                covered_controls.add(f"{e['framework']}:{e['control_id']}")

        gaps: list[GapItem] = []
        coverage_by_framework: dict[str, float] = {}

        # Placeholder — real impl loads framework control list from DB/packages
        # and computes actual coverage per framework
        for framework_id in framework_ids:
            covered = sum(1 for c in covered_controls if c.startswith(framework_id))
            total = 64  # e.g. SOC 2 has ~64 criteria — load from framework definition
            coverage_by_framework[framework_id] = round(covered / total * 100, 1)

        return GapReport(
            audit_run_id=audit_run_id,
            gaps=gaps,
            coverage_by_framework=coverage_by_framework,
        )

    async def _get_remediation(
        self,
        control_id: str,
        framework: str,
        control_description: str,
    ) -> list[dict[str, Any]]:
        prompt = REMEDIATION_PROMPT.format(
            framework=framework,
            control_id=control_id,
            control_description=control_description,
        )
        response = await self.client.messages.create(
            model=settings.ANTHROPIC_MODEL,
            max_tokens=512,
            messages=[{"role": "user", "content": prompt}],
        )
        try:
            data = json.loads(response.content[0].text)
            return data.get("suggestions", [])
        except (json.JSONDecodeError, IndexError):
            return []

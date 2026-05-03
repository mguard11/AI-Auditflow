"""
Control Mapper Agent

Given policy document chunks, maps each chunk to relevant compliance
framework controls using Claude with structured output.

Design principle: always cites source chunks — never asserts coverage
without a traceable policy excerpt.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any

import structlog
from anthropic import AsyncAnthropic

from src.lib.config import settings

logger = structlog.get_logger()

SYSTEM_PROMPT = """You are a compliance expert specialising in mapping corporate policies to control frameworks.

Given a policy document excerpt, identify which compliance controls it covers.

Rules:
- Only map to a control if the excerpt DIRECTLY addresses the control requirement
- Never infer coverage from vague or general language
- Return JSON only — no preamble, no markdown
- Each mapping must include a confidence score (0.0–1.0) and a brief rationale

Output format:
{
  "mappings": [
    {
      "control_id": "CC6.1",
      "framework": "soc2",
      "confidence": 0.85,
      "rationale": "Policy explicitly states access reviews are conducted quarterly"
    }
  ]
}
"""


@dataclass
class ControlMapping:
    chunk_id: str
    chunk_text: str
    control_id: str
    framework: str
    confidence: float
    rationale: str


class ControlMapperAgent:
    def __init__(self, client: AsyncAnthropic) -> None:
        self.client = client

    async def run(
        self,
        chunks: list[dict[str, Any]],
        framework_ids: list[str],
        audit_run_id: str,
    ) -> list[ControlMapping]:
        mappings: list[ControlMapping] = []

        for chunk in chunks:
            chunk_mappings = await self._map_chunk(chunk, framework_ids, audit_run_id)
            mappings.extend(chunk_mappings)

        return mappings

    async def _map_chunk(
        self,
        chunk: dict[str, Any],
        framework_ids: list[str],
        audit_run_id: str,
    ) -> list[ControlMapping]:
        prompt = f"""Frameworks to map against: {", ".join(framework_ids)}

Policy excerpt (chunk_id: {chunk["id"]}):
---
{chunk["text"]}
---

Map this excerpt to relevant controls."""

        response = await self.client.messages.create(
            model=settings.ANTHROPIC_MODEL,
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}],
        )

        try:
            data = json.loads(response.content[0].text)
        except (json.JSONDecodeError, IndexError, KeyError) as e:
            logger.warning("mapper.parse_error", chunk_id=chunk["id"], error=str(e))
            return []

        return [
            ControlMapping(
                chunk_id=chunk["id"],
                chunk_text=chunk["text"],
                control_id=m["control_id"],
                framework=m["framework"],
                confidence=m["confidence"],
                rationale=m["rationale"],
            )
            for m in data.get("mappings", [])
        ]

"""
AuditFlow — Core Audit Orchestrator Agent

Runs the full audit pipeline:
  1. Ingest & embed policy documents
  2. Map chunks to compliance framework controls
  3. Collect evidence from connected integrations
  4. Analyse gaps and score coverage
  5. Generate audit-ready report package
"""

from __future__ import annotations

import uuid
from dataclasses import dataclass, field
from typing import Any

import structlog
from anthropic import AsyncAnthropic

from src.agents.evidence_collector import EvidenceCollectorAgent
from src.agents.gap_analyzer import GapAnalyzerAgent
from src.agents.ingestion import IngestionAgent
from src.agents.mapper import ControlMapperAgent
from src.agents.reporter import ReporterAgent
from src.lib.config import settings
from src.services.agent_run_logger import AgentRunLogger

logger = structlog.get_logger()


@dataclass
class AuditRunConfig:
    organization_id: str
    audit_run_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    framework_ids: list[str] = field(default_factory=lambda: ["soc2"])
    policy_document_ids: list[str] = field(default_factory=list)
    evidence_source_ids: list[str] = field(default_factory=list)


@dataclass
class AuditRunResult:
    audit_run_id: str
    status: str
    control_coverage: dict[str, Any]
    gap_count: int
    report_url: str | None = None
    error: str | None = None


class AuditOrchestratorAgent:
    """Top-level agent that coordinates the full audit pipeline."""

    def __init__(self) -> None:
        self.client = AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
        self.run_logger = AgentRunLogger()

        self.ingestion = IngestionAgent(self.client)
        self.mapper = ControlMapperAgent(self.client)
        self.evidence_collector = EvidenceCollectorAgent(self.client)
        self.gap_analyzer = GapAnalyzerAgent(self.client)
        self.reporter = ReporterAgent(self.client)

    async def run(self, config: AuditRunConfig) -> AuditRunResult:
        log = logger.bind(
            audit_run_id=config.audit_run_id,
            org_id=config.organization_id,
        )
        log.info("audit_run.started", frameworks=config.framework_ids)

        try:
            # Step 1: Ingest & embed policy documents
            log.info("audit_run.step", step="ingestion")
            chunks = await self.ingestion.run(
                document_ids=config.policy_document_ids,
                audit_run_id=config.audit_run_id,
            )
            log.info("audit_run.ingestion_complete", chunk_count=len(chunks))

            # Step 2: Map chunks to framework controls
            log.info("audit_run.step", step="mapping")
            control_mappings = await self.mapper.run(
                chunks=chunks,
                framework_ids=config.framework_ids,
                audit_run_id=config.audit_run_id,
            )
            log.info("audit_run.mapping_complete", mapping_count=len(control_mappings))

            # Step 3: Collect evidence from integrations
            log.info("audit_run.step", step="evidence_collection")
            evidence_items = await self.evidence_collector.run(
                control_mappings=control_mappings,
                source_ids=config.evidence_source_ids,
                audit_run_id=config.audit_run_id,
            )
            log.info("audit_run.evidence_complete", evidence_count=len(evidence_items))

            # Step 4: Gap analysis
            log.info("audit_run.step", step="gap_analysis")
            gap_report = await self.gap_analyzer.run(
                control_mappings=control_mappings,
                evidence_items=evidence_items,
                framework_ids=config.framework_ids,
                audit_run_id=config.audit_run_id,
            )
            log.info("audit_run.gap_analysis_complete", gap_count=gap_report.gap_count)

            # Step 5: Generate report package
            log.info("audit_run.step", step="report_generation")
            report_url = await self.reporter.run(
                gap_report=gap_report,
                audit_run_id=config.audit_run_id,
                organization_id=config.organization_id,
            )

            log.info("audit_run.completed", report_url=report_url)

            return AuditRunResult(
                audit_run_id=config.audit_run_id,
                status="completed",
                control_coverage=gap_report.coverage_by_framework,
                gap_count=gap_report.gap_count,
                report_url=report_url,
            )

        except Exception as e:
            log.error("audit_run.failed", error=str(e))
            return AuditRunResult(
                audit_run_id=config.audit_run_id,
                status="failed",
                control_coverage={},
                gap_count=0,
                error=str(e),
            )

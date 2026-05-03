"""Tests for the audit orchestrator agent."""

import pytest
from unittest.mock import AsyncMock, patch, MagicMock

from src.agents.orchestrator import AuditOrchestratorAgent, AuditRunConfig


@pytest.fixture
def config():
    return AuditRunConfig(
        organization_id="org-123",
        framework_ids=["soc2"],
        policy_document_ids=["doc-1", "doc-2"],
        evidence_source_ids=["gdrive-1"],
    )


@pytest.mark.asyncio
async def test_audit_run_success(config):
    """Full audit pipeline returns a completed result with a report URL."""
    agent = AuditOrchestratorAgent()

    with patch.object(agent.ingestion, "run", new_callable=AsyncMock) as mock_ingest, \
         patch.object(agent.mapper, "run", new_callable=AsyncMock) as mock_map, \
         patch.object(agent.evidence_collector, "run", new_callable=AsyncMock) as mock_evidence, \
         patch.object(agent.gap_analyzer, "run", new_callable=AsyncMock) as mock_gap, \
         patch.object(agent.reporter, "run", new_callable=AsyncMock) as mock_report:

        mock_ingest.return_value = [{"id": "chunk-1", "text": "We conduct access reviews quarterly."}]
        mock_map.return_value = []
        mock_evidence.return_value = []
        mock_gap.return_value = MagicMock(gap_count=3, coverage_by_framework={"soc2": 74.0})
        mock_report.return_value = "https://s3.amazonaws.com/auditflow-reports/report-123.pdf"

        result = await agent.run(config)

    assert result.status == "completed"
    assert result.report_url is not None
    assert result.gap_count == 3
    assert "soc2" in result.control_coverage


@pytest.mark.asyncio
async def test_audit_run_handles_ingestion_failure(config):
    """Orchestrator returns failed status if ingestion raises."""
    agent = AuditOrchestratorAgent()

    with patch.object(agent.ingestion, "run", side_effect=Exception("S3 unavailable")):
        result = await agent.run(config)

    assert result.status == "failed"
    assert "S3 unavailable" in result.error


@pytest.mark.asyncio
async def test_audit_run_id_is_unique():
    """Each AuditRunConfig gets a unique run ID."""
    c1 = AuditRunConfig(organization_id="org-1", framework_ids=["soc2"], policy_document_ids=[])
    c2 = AuditRunConfig(organization_id="org-1", framework_ids=["soc2"], policy_document_ids=[])
    assert c1.audit_run_id != c2.audit_run_id

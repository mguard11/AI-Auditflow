"""Audit run API routes."""

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, status
from pydantic import BaseModel

from src.agents.orchestrator import AuditOrchestratorAgent, AuditRunConfig
from src.middleware.auth import get_current_org

router = APIRouter()


class CreateAuditRunRequest(BaseModel):
    framework_ids: list[str] = ["soc2"]
    policy_document_ids: list[str]
    evidence_source_ids: list[str] = []


class AuditRunResponse(BaseModel):
    audit_run_id: str
    status: str
    message: str


@router.post("/", response_model=AuditRunResponse, status_code=status.HTTP_202_ACCEPTED)
async def create_audit_run(
    body: CreateAuditRunRequest,
    background_tasks: BackgroundTasks,
    org=Depends(get_current_org),
):
    """Start a new audit run. Returns immediately; runs async in background."""
    config = AuditRunConfig(
        organization_id=org.id,
        framework_ids=body.framework_ids,
        policy_document_ids=body.policy_document_ids,
        evidence_source_ids=body.evidence_source_ids,
    )

    agent = AuditOrchestratorAgent()
    background_tasks.add_task(agent.run, config)

    return AuditRunResponse(
        audit_run_id=config.audit_run_id,
        status="queued",
        message="Audit run started. Poll /v1/audits/{audit_run_id} for status.",
    )


@router.get("/{audit_run_id}")
async def get_audit_run(audit_run_id: str, org=Depends(get_current_org)):
    """Get the current status and results of an audit run."""
    # TODO: fetch from DB
    raise HTTPException(status_code=404, detail="Audit run not found")


@router.get("/")
async def list_audit_runs(org=Depends(get_current_org)):
    """List all audit runs for the current organization."""
    # TODO: fetch from DB with pagination
    return {"audit_runs": [], "total": 0}

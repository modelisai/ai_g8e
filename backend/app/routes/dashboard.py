from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..models.project import AIProject
from ..schemas.dashboard import DashboardMetrics
from typing import List

router = APIRouter()

@router.get("/metrics", response_model=DashboardMetrics)
async def get_dashboard_metrics(db: Session = Depends(get_db)):
    total_projects = db.query(AIProject).count()
    high_risk_projects = db.query(AIProject).filter(AIProject.risk_assessment_score > 0.7).count()
    compliant_projects = db.query(AIProject).filter(AIProject.compliance_status == "Compliant").count()
    active_projects = db.query(AIProject).filter(AIProject.status == "Active").count()

    compliance_rate = (compliant_projects / total_projects) * 100 if total_projects > 0 else 0

    return DashboardMetrics(
        totalProjects=total_projects,
        highRiskProjects=high_risk_projects,
        complianceRate=round(compliance_rate, 2),
        activeProjects=active_projects
    )
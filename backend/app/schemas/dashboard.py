from pydantic import BaseModel

class DashboardMetrics(BaseModel):
    totalProjects: int
    highRiskProjects: int
    complianceRate: float
    activeProjects: int
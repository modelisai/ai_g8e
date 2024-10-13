from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import date

class AIProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    status: str
    sponsor: Optional[str] = None
    project_manager: Optional[str] = None
    ai_models: Optional[List[str]] = None
    repository_uri: Optional[str] = None
    creation_date: Optional[date] = None
    last_updated_date: Optional[date] = None
    start_date: Optional[date] = None
    estimated_completion_date: Optional[date] = None
    actual_completion_date: Optional[date] = None
    team_members: Optional[List[Dict[str, str]]] = None
    programming_languages: Optional[List[str]] = None
    frameworks_and_libraries: Optional[List[str]] = None
    development_environment: Optional[str] = None
    data_sources: Optional[List[str]] = None
    data_storage_location: Optional[str] = None
    data_sensitivity_level: Optional[str] = None
    data_retention_policy: Optional[str] = None
    risk_assessment_score: Optional[float] = None
    compliance_status: Optional[str] = None
    applicable_policies: Optional[List[str]] = None
    regulatory_requirements: Optional[List[str]] = None
    kpis: Optional[Dict[str, float]] = None
    model_accuracy: Optional[float] = None
    processing_time: Optional[float] = None
    resource_usage: Optional[Dict[str, float]] = None
    potential_biases: Optional[List[str]] = None
    fairness_measures: Optional[List[str]] = None
    transparency_level: Optional[str] = None
    deployment_environment: Optional[str] = None
    api_endpoints: Optional[List[str]] = None
    scalability_info: Optional[str] = None
    technical_documentation_uri: Optional[str] = None
    user_guide_uri: Optional[str] = None
    model_cards: Optional[List[Dict[str, str]]] = None
    version_history: Optional[List[Dict[str, str]]] = None
    changelog: Optional[List[Dict[str, str]]] = None
    allocated_budget: Optional[float] = None
    current_spend: Optional[float] = None
    resource_allocation: Optional[Dict[str, float]] = None
    external_dependencies: Optional[List[str]] = None
    internal_project_dependencies: Optional[List[str]] = None
    security_clearance_level: Optional[str] = None
    access_control_list: Optional[List[str]] = None
    encryption_details: Optional[str] = None
    monitoring_tools: Optional[List[str]] = None
    maintenance_schedule: Optional[str] = None
    incident_response_plan: Optional[str] = None

class AIProjectCreate(AIProjectBase):
    pass

class AIProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    sponsor: Optional[str] = None
    project_manager: Optional[str] = None
    ai_models: Optional[List[str]] = None
    repository_uri: Optional[str] = None
    start_date: Optional[date] = None
    estimated_completion_date: Optional[date] = None
    actual_completion_date: Optional[date] = None
    team_members: Optional[List[Dict[str, str]]] = None
    programming_languages: Optional[List[str]] = None
    frameworks_and_libraries: Optional[List[str]] = None
    development_environment: Optional[str] = None
    data_sources: Optional[List[str]] = None
    data_storage_location: Optional[str] = None
    data_sensitivity_level: Optional[str] = None
    data_retention_policy: Optional[str] = None
    risk_assessment_score: Optional[float] = None
    compliance_status: Optional[str] = None
    applicable_policies: Optional[List[str]] = None
    regulatory_requirements: Optional[List[str]] = None
    kpis: Optional[Dict[str, float]] = None
    model_accuracy: Optional[float] = None
    processing_time: Optional[float] = None
    resource_usage: Optional[Dict[str, float]] = None
    potential_biases: Optional[List[str]] = None
    fairness_measures: Optional[List[str]] = None
    transparency_level: Optional[str] = None
    deployment_environment: Optional[str] = None
    api_endpoints: Optional[List[str]] = None
    scalability_info: Optional[str] = None
    technical_documentation_uri: Optional[str] = None
    user_guide_uri: Optional[str] = None
    model_cards: Optional[List[Dict[str, str]]] = None
    version_history: Optional[List[Dict[str, str]]] = None
    changelog: Optional[List[Dict[str, str]]] = None
    allocated_budget: Optional[float] = None
    current_spend: Optional[float] = None
    resource_allocation: Optional[Dict[str, float]] = None
    external_dependencies: Optional[List[str]] = None
    internal_project_dependencies: Optional[List[str]] = None
    security_clearance_level: Optional[str] = None
    access_control_list: Optional[List[str]] = None
    encryption_details: Optional[str] = None
    monitoring_tools: Optional[List[str]] = None
    maintenance_schedule: Optional[str] = None
    incident_response_plan: Optional[str] = None

class AIProjectInDBBase(AIProjectBase):
    id: int
    creation_date: date
    last_updated_date: date

    class Config:
        orm_mode = True

class AIProject(AIProjectInDBBase):
    pass

class AIProjectInDB(AIProjectInDBBase):
    pass
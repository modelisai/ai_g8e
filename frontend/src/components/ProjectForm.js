import React, { useState, useEffect } from 'react';
import '../styles/ProjectForm.css';

const ProjectForm = ({ initialData, onSubmit, submitButtonText = 'Submit' }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: '',
    sponsor: '',
    project_manager: '',
    start_date: '',
    estimated_completion_date: '',
    actual_completion_date: '',
    team_members: [],
    ai_models: [],
    programming_languages: [],
    frameworks_and_libraries: [],
    repository_uri: '',
    development_environment: '',
    data_sources: [],
    data_storage_location: '',
    data_sensitivity_level: '',
    data_retention_policy: '',
    risk_assessment_score: '',
    compliance_status: '',
    applicable_policies: [],
    regulatory_requirements: [],
    model_accuracy: '',
    processing_time: '',
    potential_biases: [],
    fairness_measures: [],
    transparency_level: '',
    deployment_environment: '',
    api_endpoints: [],
    scalability_info: '',
    technical_documentation_uri: '',
    user_guide_uri: '',
    model_cards: [],
    allocated_budget: '',
    current_spend: '',
    monitoring_tools: [],
    maintenance_schedule: '',
    incident_response_plan: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prevData => ({
        ...prevData,
        ...initialData,
        start_date: initialData.start_date ? new Date(initialData.start_date).toISOString().split('T')[0] : '',
        estimated_completion_date: initialData.estimated_completion_date ? new Date(initialData.estimated_completion_date).toISOString().split('T')[0] : '',
        actual_completion_date: initialData.actual_completion_date ? new Date(initialData.actual_completion_date).toISOString().split('T')[0] : '',
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="form-group">
        <label htmlFor="name">Project Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="Proposed">Proposed</option>
          <option value="In Development">In Development</option>
          <option value="Active">Active</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="sponsor">Sponsor</label>
        <input type="text" id="sponsor" name="sponsor" value={formData.sponsor} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="project_manager">Project Manager</label>
        <input type="text" id="project_manager" name="project_manager" value={formData.project_manager} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="start_date">Start Date</label>
        <input type="date" id="start_date" name="start_date" value={formData.start_date} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="estimated_completion_date">Estimated Completion Date</label>
        <input type="date" id="estimated_completion_date" name="estimated_completion_date" value={formData.estimated_completion_date} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="actual_completion_date">Actual Completion Date</label>
        <input type="date" id="actual_completion_date" name="actual_completion_date" value={formData.actual_completion_date} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="team_members">Team Members (comma-separated)</label>
        <input type="text" id="team_members" name="team_members" value={formData.team_members.join(', ')} onChange={handleArrayChange} />
      </div>

      <div className="form-group">
        <label htmlFor="ai_models">AI Models (comma-separated)</label>
        <input type="text" id="ai_models" name="ai_models" value={formData.ai_models.join(', ')} onChange={handleArrayChange} />
      </div>

      {/* Add more form fields for the remaining project properties */}

      <button type="submit" className="submit-button">{submitButtonText}</button>
    </form>
  );
};

export default ProjectForm;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { formatDate, calculateRiskLevel } from '../utils/projectUtils';
import '../styles/ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/projects/${id}`);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching project details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading project details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!project) return <div className="error">Project not found.</div>;

  return (
    <div className="project-details-container">
      <h1>{project.name}</h1>
      <div className="project-meta">
        <span className={`status status-${project.status.toLowerCase()}`}>{project.status}</span>
        <span className={`risk-level risk-${calculateRiskLevel(project.risk_assessment_score)}`}>
          Risk Score: {project.risk_assessment_score?.toFixed(2) || 'N/A'}
        </span>
      </div>

      <section className="project-section">
        <h2>Overview</h2>
        <p>{project.description}</p>
        <div className="detail-grid">
          <div><strong>Sponsor:</strong> {project.sponsor || 'N/A'}</div>
          <div><strong>Project Manager:</strong> {project.project_manager || 'N/A'}</div>
          <div><strong>Start Date:</strong> {formatDate(project.start_date)}</div>
          <div><strong>Estimated Completion:</strong> {formatDate(project.estimated_completion_date)}</div>
          <div><strong>Actual Completion:</strong> {formatDate(project.actual_completion_date)}</div>
        </div>
      </section>

      <section className="project-section">
        <h2>Team</h2>
        <ul>
          {project.team_members && project.team_members.map((member, index) => (
            <li key={index}>{member.name} - {member.role}</li>
          ))}
        </ul>
      </section>

      <section className="project-section">
        <h2>Technical Details</h2>
        <div className="detail-grid">
          <div><strong>AI Models:</strong> {project.ai_models?.join(', ') || 'N/A'}</div>
          <div><strong>Programming Languages:</strong> {project.programming_languages?.join(', ') || 'N/A'}</div>
          <div><strong>Frameworks/Libraries:</strong> {project.frameworks_and_libraries?.join(', ') || 'N/A'}</div>
          <div><strong>Repository:</strong> {project.repository_uri || 'N/A'}</div>
          <div><strong>Development Environment:</strong> {project.development_environment || 'N/A'}</div>
        </div>
      </section>

      <section className="project-section">
        <h2>Data Management</h2>
        <div className="detail-grid">
          <div><strong>Data Sources:</strong> {project.data_sources?.join(', ') || 'N/A'}</div>
          <div><strong>Storage Location:</strong> {project.data_storage_location || 'N/A'}</div>
          <div><strong>Sensitivity Level:</strong> {project.data_sensitivity_level || 'N/A'}</div>
          <div><strong>Retention Policy:</strong> {project.data_retention_policy || 'N/A'}</div>
        </div>
      </section>

      <section className="project-section">
        <h2>Compliance and Governance</h2>
        <div className="detail-grid">
          <div><strong>Compliance Status:</strong> {project.compliance_status || 'N/A'}</div>
          <div><strong>Applicable Policies:</strong> {project.applicable_policies?.join(', ') || 'N/A'}</div>
          <div><strong>Regulatory Requirements:</strong> {project.regulatory_requirements?.join(', ') || 'N/A'}</div>
        </div>
      </section>

      <section className="project-section">
        <h2>Performance and Ethics</h2>
        <div className="detail-grid">
          <div><strong>Model Accuracy:</strong> {project.model_accuracy?.toFixed(2) || 'N/A'}</div>
          <div><strong>Processing Time:</strong> {project.processing_time ? `${project.processing_time} ms` : 'N/A'}</div>
          <div><strong>Potential Biases:</strong> {project.potential_biases?.join(', ') || 'N/A'}</div>
          <div><strong>Fairness Measures:</strong> {project.fairness_measures?.join(', ') || 'N/A'}</div>
          <div><strong>Transparency Level:</strong> {project.transparency_level || 'N/A'}</div>
        </div>
      </section>

      <section className="project-section">
        <h2>Deployment and Maintenance</h2>
        <div className="detail-grid">
          <div><strong>Deployment Environment:</strong> {project.deployment_environment || 'N/A'}</div>
          <div><strong>API Endpoints:</strong> {project.api_endpoints?.join(', ') || 'N/A'}</div>
          <div><strong>Scalability Info:</strong> {project.scalability_info || 'N/A'}</div>
          <div><strong>Monitoring Tools:</strong> {project.monitoring_tools?.join(', ') || 'N/A'}</div>
          <div><strong>Maintenance Schedule:</strong> {project.maintenance_schedule || 'N/A'}</div>
        </div>
      </section>

      <section className="project-section">
        <h2>Documentation</h2>
        <div className="detail-grid">
          <div><strong>Technical Documentation:</strong> {project.technical_documentation_uri || 'N/A'}</div>
          <div><strong>User Guide:</strong> {project.user_guide_uri || 'N/A'}</div>
          <div><strong>Model Cards:</strong> {project.model_cards?.length || 0} available</div>
        </div>
      </section>

      <div className="project-actions">
        <Link to={`/projects/${id}/edit`} className="btn btn-primary">Edit Project</Link>
        <Link to="/projects" className="btn btn-secondary">Back to Projects</Link>
      </div>
    </div>
  );
};

export default ProjectDetails;
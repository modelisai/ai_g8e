import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
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
        <span className="risk-score">Risk Score: {project.risk_score.toFixed(2)}</span>
      </div>
      <div className="project-description">
        <h2>Description</h2>
        <p>{project.description}</p>
      </div>
      <div className="project-actions">
        <Link to={`/projects/${id}/edit`} className="btn btn-primary">Edit Project</Link>
        <button className="btn btn-danger">Delete Project</button>
      </div>
      <div className="project-sections">
        <div className="section">
          <h2>Team Members</h2>
          <ul>
            {project.team_members && project.team_members.map(member => (
              <li key={member.id}>{member.name} - {member.role}</li>
            ))}
          </ul>
        </div>
        <div className="section">
          <h2>Milestones</h2>
          <ul>
            {project.milestones && project.milestones.map(milestone => (
              <li key={milestone.id}>
                {milestone.name} - {milestone.status}
                <span className="date">{new Date(milestone.due_date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="section">
          <h2>Related Policies</h2>
          <ul>
            {project.related_policies && project.related_policies.map(policy => (
              <li key={policy.id}>
                <Link to={`/policies/${policy.id}`}>{policy.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link to="/projects" className="btn btn-secondary">Back to Projects</Link>
    </div>
  );
};

export default ProjectDetails;
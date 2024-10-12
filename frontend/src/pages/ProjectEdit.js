import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProjectForm from '../components/ProjectForm';
import '../styles/ProjectEdit.css';

const ProjectEdit = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/projects/${id}`);
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Error fetching project. Please try again.');
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (updatedProject) => {
    try {
      await axios.put(`http://localhost:8000/api/projects/${id}`, updatedProject);
      navigate(`/projects/${id}`);
    } catch (error) {
      console.error('Error updating project:', error);
      setError('Error updating project. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading project...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!project) return <div className="error">Project not found.</div>;

  return (
    <div className="project-edit">
      <h2>Edit Project: {project.name}</h2>
      <ProjectForm 
        initialData={project} 
        onSubmit={handleSubmit} 
        submitButtonText="Update Project"
      />
    </div>
  );
};

export default ProjectEdit;
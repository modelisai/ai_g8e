import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProjectEdit.css';

const ProjectEdit = () => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    status: '',
    risk_score: 0
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProject();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/projects/${id}`, project);
      navigate(`/projects/${id}`);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div className="project-edit">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={project.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={project.description} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" name="status" value={project.status} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Risk Score:</label>
          <input type="number" name="risk_score" value={project.risk_score} onChange={handleInputChange} required step="0.01" min="0" max="1" />
        </div>
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default ProjectEdit;
import React from 'react';
import ProjectForm from '../components/ProjectForm';

const ProjectCreate = () => {
  const handleSubmit = (projectData) => {
    // TODO: Implement project creation logic
    console.log('Creating project:', projectData);
  };

  return (
    <div className="project-create">
      <h2>Create New Project</h2>
      <ProjectForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ProjectCreate;
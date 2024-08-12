import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import ProjectDetails from './pages/ProjectDetails';
import ProjectEdit from './pages/ProjectEdit';
import Policies from './pages/Policies';
import RiskAssessment from './pages/RiskAssessment';
import Compliance from './pages/Compliance';
import Navbar from './components/Navbar';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/projects/:id/edit" element={<ProjectEdit />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/compliance" element={<Compliance />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
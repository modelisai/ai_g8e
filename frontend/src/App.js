import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import ProjectDetails from './pages/ProjectDetails';
import ProjectEdit from './pages/ProjectEdit';
import ProjectCreate from './pages/ProjectCreate';
import Policies from './pages/Policies';
import RiskAssessment from './pages/RiskAssessment';
import Compliance from './pages/Compliance';
import UserManagement from './pages/UserManagement';
import Reports from './pages/Reports';
import Approvals from './pages/Approvals';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="content-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/new" element={<ProjectCreate />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/projects/:id/edit" element={<ProjectEdit />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/risk-assessment" element={<RiskAssessment />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/new" element={<Reports />} />
            <Route path="/approvals" element={<Approvals />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
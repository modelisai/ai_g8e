import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import ProjectDetails from './pages/ProjectDetails';
import Policies from './pages/Policies';
import RiskAssessment from './pages/RiskAssessment.js';
import Compliance from './pages/Compliance';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content-container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/projects" component={ProjectList} />
            <Route path="/projects/:id" component={ProjectDetails} />
            <Route path="/policies" component={Policies} />
            <Route path="/risk-assessment" component={RiskAssessment} />
            <Route path="/compliance" component={Compliance} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
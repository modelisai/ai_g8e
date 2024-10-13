import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faClipboardCheck, 
  faFileAlt, 
  faChartBar, 
  faUserShield 
} from '@fortawesome/free-solid-svg-icons';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { 
      name: 'New Project', 
      icon: faPlus, 
      action: () => navigate('/projects/new')
    },
    { 
      name: 'Review Approvals', 
      icon: faClipboardCheck, 
      action: () => navigate('/approvals')
    },
    { 
      name: 'Generate Report', 
      icon: faFileAlt, 
      action: () => navigate('/reports/new')
    },
    { 
      name: 'Risk Assessment', 
      icon: faChartBar, 
      action: () => navigate('/risk-assessment')
    },
    { 
      name: 'User Management', 
      icon: faUserShield, 
      action: () => navigate('/users')
    }
  ];

  return (
    <div className="quick-actions">
      {actions.map((action, index) => (
        <button 
          key={index} 
          className="quick-action-button" 
          onClick={action.action}
        >
          <FontAwesomeIcon icon={action.icon} />
          <span>{action.name}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faProjectDiagram, 
  faExclamationTriangle, 
  faCheckCircle, 
  faClock 
} from '@fortawesome/free-solid-svg-icons';

const DashboardMetric = ({ title, value, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'projects':
        return faProjectDiagram;
      case 'risk':
        return faExclamationTriangle;
      case 'compliance':
        return faCheckCircle;
      case 'active':
        return faClock;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-metric">
      <div className="metric-icon">
        <FontAwesomeIcon icon={getIcon()} size="2x" />
      </div>
      <h3>{title}</h3>
      <div className="metric-value">{value}</div>
    </div>
  );
};

DashboardMetric.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOf(['projects', 'risk', 'compliance', 'active']).isRequired,
};

export default DashboardMetric;
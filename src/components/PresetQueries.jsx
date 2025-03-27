import React from 'react';
import { predefinedQueries } from '../utils/sqlUtils';
import '../styles/PresetQueries.css';

const PresetQueries = ({ onSelectQuery }) => {
  return (
    <div className="preset-queries fade-in" style={{ animationDelay: '0.1s' }}>
      <h2 className="preset-title">Predefined Queries</h2>
      <div className="preset-list">
        {predefinedQueries.map(query => (
          <button
            key={query.id}
            className="preset-button"
            onClick={() => onSelectQuery(query.query)}
          >
            {query.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetQueries;

import React from 'react';

const Statistics = ({ statistics }) => {
  return (
    <div className="statistics">
      <h3>Class Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Students</h4>
          <p className="stat-value">{statistics.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h4>Class Average</h4>
          <p className="stat-value">{statistics.classAverage?.toFixed(2) || 'N/A'}</p>
        </div>
        <div className="stat-card">
          <h4>Highest Score</h4>
          <p className="stat-value">{statistics.highestScore || 'N/A'}</p>
        </div>
        <div className="stat-card">
          <h4>Lowest Score</h4>
          <p className="stat-value">{statistics.lowestScore || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
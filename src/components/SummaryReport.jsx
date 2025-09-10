import React from 'react';

const SummaryReport = ({ statistics }) => {
  const getGradeClass = (grade) => {
    if (grade >= 90) return 'grade-a';
    if (grade >= 80) return 'grade-b';
    if (grade >= 70) return 'grade-c';
    if (grade >= 60) return 'grade-d';
    return 'grade-f';
  };

  const getPerformanceLevel = (average) => {
    if (average >= 90) return { level: 'Excellent', class: 'excellent' };
    if (average >= 80) return { level: 'Good', class: 'good' };
    if (average >= 70) return { level: 'Average', class: 'average' };
    if (average >= 60) return { level: 'Below Average', class: 'below-average' };
    return { level: 'Poor', class: 'poor' };
  };

  if (statistics.totalStudents === 0) {
    return (
      <div className="summary-report">
        <h2>Class Summary Report</h2>
        <p className="no-data">No students data available for summary.</p>
      </div>
    );
  }

  const performance = getPerformanceLevel(statistics.classAverage);

  return (
    <div className="summary-report">
      <h2>Class Summary Report</h2>
      
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-icon">👥</div>
          <div className="summary-content">
            <h3>Total Students</h3>
            <p className="summary-number">{statistics.totalStudents}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">📊</div>
          <div className="summary-content">
            <h3>Class Average</h3>
            <p className={`summary-number ${getGradeClass(statistics.classAverage)}`}>
              {statistics.classAverage.toFixed(1)}%
            </p>
            <span className={`performance-badge ${performance.class}`}>
              {performance.level}
            </span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">🏆</div>
          <div className="summary-content">
            <h3>Highest Grade</h3>
            <p className={`summary-number ${getGradeClass(statistics.highestGrade)}`}>
              {statistics.highestGrade}%
            </p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">📉</div>
          <div className="summary-content">
            <h3>Lowest Grade</h3>
            <p className={`summary-number ${getGradeClass(statistics.lowestGrade)}`}>
              {statistics.lowestGrade}%
            </p>
          </div>
        </div>
      </div>

      <div className="grade-distribution">
        <h3>Grade Scale Reference</h3>
        <div className="grade-scale">
          <div className="grade-range grade-a">A: 90-100%</div>
          <div className="grade-range grade-b">B: 80-89%</div>
          <div className="grade-range grade-c">C: 70-79%</div>
          <div className="grade-range grade-d">D: 60-69%</div>
          <div className="grade-range grade-f">F: Below 60%</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryReport;
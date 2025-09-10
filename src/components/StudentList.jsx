import React, { useState } from 'react';

const StudentList = ({ students, onDeleteStudent, onAddGrade }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newGrade, setNewGrade] = useState('');
  const [gradeError, setGradeError] = useState('');

  const handleAddGrade = (studentId) => {
    const grade = parseFloat(newGrade);
    
    if (isNaN(grade) || grade < 0 || grade > 100) {
      setGradeError('Grade must be a number between 0 and 100');
      return;
    }

    onAddGrade(studentId, grade);
    setNewGrade('');
    setGradeError('');
    setSelectedStudent(null);
  };

  const getGradeClass = (grade) => {
    if (grade >= 90) return 'grade-a';
    if (grade >= 80) return 'grade-b';
    if (grade >= 70) return 'grade-c';
    if (grade >= 60) return 'grade-d';
    return 'grade-f';
  };

  if (students.length === 0) {
    return (
      <div className="student-list">
        <h2>Student List</h2>
        <p className="no-students">No students added yet. Add your first student above!</p>
      </div>
    );
  }

  return (
    <div className="student-list">
      <h2>Student List ({students.length} students)</h2>
      <div className="students-grid">
        {students.map(student => (
          <div key={student.id} className="student-card">
            <div className="student-header">
              <h3>{student.name}</h3>
              <button
                onClick={() => onDeleteStudent(student.id)}
                className="btn btn-danger btn-small"
                title="Delete Student"
              >
                ×
              </button>
            </div>
            
            <div className="student-stats">
              <div className="stat">
                <span className="stat-label">Average:</span>
                <span className={`stat-value ${getGradeClass(student.average)}`}>
                  {student.average.toFixed(1)}%
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Highest:</span>
                <span className={`stat-value ${getGradeClass(student.highest)}`}>
                  {student.highest}%
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Lowest:</span>
                <span className={`stat-value ${getGradeClass(student.lowest)}`}>
                  {student.lowest}%
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Total Grades:</span>
                <span className="stat-value">{student.totalGrades}</span>
              </div>
            </div>

            <div className="grades-section">
              <h4>Grades:</h4>
              <div className="grades-list">
                {student.grades.map((grade, index) => (
                  <span
                    key={index}
                    className={`grade-badge ${getGradeClass(grade)}`}
                  >
                    {grade}%
                  </span>
                ))}
              </div>
            </div>

            <div className="add-grade-section">
              {selectedStudent === student.id ? (
                <div className="add-grade-form">
                  <input
                    type="number"
                    value={newGrade}
                    onChange={(e) => {
                      setNewGrade(e.target.value);
                      setGradeError('');
                    }}
                    placeholder="Enter grade (0-100)"
                    min="0"
                    max="100"
                    className={gradeError ? 'error' : ''}
                  />
                  {gradeError && <span className="error-message">{gradeError}</span>}
                  <div className="grade-buttons">
                    <button
                      onClick={() => handleAddGrade(student.id)}
                      className="btn btn-success btn-small"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStudent(null);
                        setNewGrade('');
                        setGradeError('');
                      }}
                      className="btn btn-secondary btn-small"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedStudent(student.id)}
                  className="btn btn-primary btn-small"
                >
                  Add Grade
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SummaryReport from './components/SummaryReport';
import { studentAPI } from './services/api';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [statistics, setStatistics] = useState({
    totalStudents: 0,
    classAverage: 0,
    highestGrade: 0,
    lowestGrade: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load students on component mount
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const [studentsResponse, statsResponse] = await Promise.all([
        studentAPI.getAllStudents(),
        studentAPI.getStatistics()
      ]);
      
      setStudents(studentsResponse.data);
      setStatistics(statsResponse.data);
      setError('');
    } catch (err) {
      setError('Failed to load students data. Please make sure the backend server is running.');
      console.error('Error loading students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (studentData) => {
    try {
      await studentAPI.addStudent(studentData);
      await loadStudents(); // Reload data
      setError('');
    } catch (err) {
      setError('Failed to add student. Please try again.');
      console.error('Error adding student:', err);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentAPI.deleteStudent(studentId);
        await loadStudents(); // Reload data
        setError('');
      } catch (err) {
        setError('Failed to delete student. Please try again.');
        console.error('Error deleting student:', err);
      }
    }
  };

  const handleAddGrade = async (studentId, grade) => {
    try {
      await studentAPI.addGrade(studentId, grade);
      await loadStudents(); // Reload data
      setError('');
    } catch (err) {
      setError('Failed to add grade. Please try again.');
      console.error('Error adding grade:', err);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading Student Grade Tracker...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 Student Grade Tracker</h1>
        <p>Manage student grades and track academic performance</p>
      </header>

      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={() => setError('')} className="error-close">×</button>
        </div>
      )}

      <main className="app-main">
        <div className="app-grid">
          <section className="form-section">
            <StudentForm onAddStudent={handleAddStudent} />
          </section>

          <section className="summary-section">
            <SummaryReport statistics={statistics} />
          </section>

          <section className="list-section">
            <StudentList
              students={students}
              onDeleteStudent={handleDeleteStudent}
              onAddGrade={handleAddGrade}
            />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2024 Student Grade Tracker - Built with React & Spring Boot</p>
      </footer>
    </div>
  );
}

export default App;
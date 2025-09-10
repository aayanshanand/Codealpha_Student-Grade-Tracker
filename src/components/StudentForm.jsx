import React, { useState } from 'react';

const StudentForm = ({ onAddStudent }) => {
  const [studentData, setStudentData] = useState({
    name: '',
    grades: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!studentData.name.trim()) {
      newErrors.name = 'Student name is required';
    }
    
    if (!studentData.grades.trim()) {
      newErrors.grades = 'At least one grade is required';
    } else {
      const gradesArray = studentData.grades.split(',').map(g => g.trim());
      const invalidGrades = gradesArray.filter(grade => {
        const num = parseFloat(grade);
        return isNaN(num) || num < 0 || num > 100;
      });
      
      if (invalidGrades.length > 0) {
        newErrors.grades = 'Grades must be numbers between 0 and 100, separated by commas';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const gradesArray = studentData.grades
      .split(',')
      .map(grade => parseFloat(grade.trim()))
      .filter(grade => !isNaN(grade));

    const newStudent = {
      name: studentData.name.trim(),
      grades: gradesArray
    };

    onAddStudent(newStudent);
    
    // Reset form
    setStudentData({
      name: '',
      grades: ''
    });
    setErrors({});
  };

  return (
    <div className="student-form">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Student Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={studentData.name}
            onChange={handleInputChange}
            className={errors.name ? 'error' : ''}
            placeholder="Enter student name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="grades">Grades (comma-separated):</label>
          <input
            type="text"
            id="grades"
            name="grades"
            value={studentData.grades}
            onChange={handleInputChange}
            className={errors.grades ? 'error' : ''}
            placeholder="e.g., 85, 92, 78, 95"
          />
          {errors.grades && <span className="error-message">{errors.grades}</span>}
        </div>

        <button type="submit" className="btn btn-primary">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
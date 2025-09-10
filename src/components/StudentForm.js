import React, { useState } from 'react';

const StudentForm = ({ onAddStudent, editingStudent, onUpdateStudent, onCancelEdit }) => {
  const [name, setName] = useState(editingStudent ? editingStudent.name : '');
  const [gradesInput, setGradesInput] = useState(
    editingStudent ? editingStudent.grades.join(', ') : ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const grades = gradesInput
      .split(',')
      .map(grade => parseFloat(grade.trim()))
      .filter(grade => !isNaN(grade) && grade >= 0 && grade <= 100);

    const student = { name: name.trim(), grades };

    if (editingStudent) {
      onUpdateStudent(editingStudent.id, student);
    } else {
      onAddStudent(student);
    }

    setName('');
    setGradesInput('');
  };

  const handleCancel = () => {
    setName('');
    setGradesInput('');
    onCancelEdit();
  };

  return (
    <div className="student-form">
      <h3>{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
            required
          />
        </div>
        <div className="form-group">
          <label>Grades (comma-separated, 0-100):</label>
          <input
            type="text"
            value={gradesInput}
            onChange={(e) => setGradesInput(e.target.value)}
            placeholder="85, 92, 78, 95"
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {editingStudent ? 'Update Student' : 'Add Student'}
          </button>
          {editingStudent && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
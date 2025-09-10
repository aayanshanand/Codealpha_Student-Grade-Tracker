import React from 'react';

const StudentList = ({ students, onEditStudent, onDeleteStudent }) => {
  return (
    <div className="student-list">
      <h3>Student List</h3>
      {students.length === 0 ? (
        <p>No students added yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Grades</th>
                <th>Average</th>
                <th>Highest</th>
                <th>Lowest</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.grades.join(', ') || 'No grades'}</td>
                  <td>{student.grades.length > 0 ? student.average?.toFixed(2) : 'N/A'}</td>
                  <td>{student.grades.length > 0 ? student.highestGrade : 'N/A'}</td>
                  <td>{student.grades.length > 0 ? student.lowestGrade : 'N/A'}</td>
                  <td>
                    <button
                      onClick={() => onEditStudent(student)}
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteStudent(student.id)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
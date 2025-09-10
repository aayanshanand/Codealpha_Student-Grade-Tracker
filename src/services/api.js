import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentAPI = {
  // Get all students
  getAllStudents: () => api.get('/students'),
  
  // Get student by ID
  getStudentById: (id) => api.get(`/students/${id}`),
  
  // Add new student
  addStudent: (student) => api.post('/students', student),
  
  // Update student
  updateStudent: (id, student) => api.put(`/students/${id}`, student),
  
  // Delete student
  deleteStudent: (id) => api.delete(`/students/${id}`),
  
  // Add grade to student
  addGrade: (id, grade) => api.post(`/students/${id}/grades`, { grade }),
  
  // Get class statistics
  getStatistics: () => api.get('/students/statistics'),
};

export default api;
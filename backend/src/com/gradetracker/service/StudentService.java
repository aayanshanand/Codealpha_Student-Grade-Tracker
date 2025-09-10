package com.gradetracker.service;

import com.gradetracker.model.Student;
import com.gradetracker.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }
    
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }
    
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
    
    public Map<String, Object> getStatistics() {
        List<Student> students = studentRepository.findAll();
        Map<String, Object> stats = new HashMap<>();
        
        if (students.isEmpty()) {
            stats.put("totalStudents", 0);
            stats.put("classAverage", 0.0);
            stats.put("highestScore", 0.0);
            stats.put("lowestScore", 0.0);
            return stats;
        }
        
        double totalSum = 0;
        double highestScore = Double.MIN_VALUE;
        double lowestScore = Double.MAX_VALUE;
        int totalGrades = 0;
        
        for (Student student : students) {
            List<Double> grades = student.getGrades();
            for (Double grade : grades) {
                totalSum += grade;
                totalGrades++;
                if (grade > highestScore) highestScore = grade;
                if (grade < lowestScore) lowestScore = grade;
            }
        }
        
        stats.put("totalStudents", students.size());
        stats.put("classAverage", totalGrades > 0 ? totalSum / totalGrades : 0.0);
        stats.put("highestScore", totalGrades > 0 ? highestScore : 0.0);
        stats.put("lowestScore", totalGrades > 0 ? lowestScore : 0.0);
        
        return stats;
    }
}
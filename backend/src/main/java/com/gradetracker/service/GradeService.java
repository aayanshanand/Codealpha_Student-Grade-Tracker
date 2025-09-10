package com.gradetracker.service;

import com.gradetracker.model.Student;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class GradeService {
    private final Map<Long, Student> students = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);
    
    // Add student
    public Student addStudent(Student student) {
        Long id = idGenerator.getAndIncrement();
        student.setId(id);
        student.calculateStatistics();
        students.put(id, student);
        return student;
    }
    
    // Get all students
    public List<Student> getAllStudents() {
        return new ArrayList<>(students.values());
    }
    
    // Get student by ID
    public Optional<Student> getStudentById(Long id) {
        return Optional.ofNullable(students.get(id));
    }
    
    // Update student
    public Student updateStudent(Long id, Student updatedStudent) {
        if (students.containsKey(id)) {
            updatedStudent.setId(id);
            updatedStudent.calculateStatistics();
            students.put(id, updatedStudent);
            return updatedStudent;
        }
        return null;
    }
    
    // Delete student
    public boolean deleteStudent(Long id) {
        return students.remove(id) != null;
    }
    
    // Add grade to student
    public Student addGradeToStudent(Long id, double grade) {
        Student student = students.get(id);
        if (student != null) {
            student.addGrade(grade);
            return student;
        }
        return null;
    }
    
    // Get class statistics
    public Map<String, Object> getClassStatistics() {
        if (students.isEmpty()) {
            return Map.of(
                "totalStudents", 0,
                "classAverage", 0.0,
                "highestGrade", 0.0,
                "lowestGrade", 0.0
            );
        }
        
        double totalAverage = 0.0;
        double highestGrade = Double.MIN_VALUE;
        double lowestGrade = Double.MAX_VALUE;
        
        for (Student student : students.values()) {
            totalAverage += student.getAverage();
            if (student.getHighest() > highestGrade) {
                highestGrade = student.getHighest();
            }
            if (student.getLowest() < lowestGrade) {
                lowestGrade = student.getLowest();
            }
        }
        
        return Map.of(
            "totalStudents", students.size(),
            "classAverage", totalAverage / students.size(),
            "highestGrade", highestGrade,
            "lowestGrade", lowestGrade
        );
    }
}
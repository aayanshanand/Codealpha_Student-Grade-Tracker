package com.gradetracker.controller;

import com.gradetracker.model.Student;
import com.gradetracker.service.GradeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    
    @Autowired
    private GradeService gradeService;
    
    // Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return gradeService.getAllStudents();
    }
    
    // Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = gradeService.getStudentById(id);
        return student.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    // Add new student
    @PostMapping
    public Student addStudent(@Valid @RequestBody Student student) {
        return gradeService.addStudent(student);
    }
    
    // Update student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, 
                                               @Valid @RequestBody Student student) {
        Student updatedStudent = gradeService.updateStudent(id, student);
        return updatedStudent != null ? ResponseEntity.ok(updatedStudent) 
                                      : ResponseEntity.notFound().build();
    }
    
    // Delete student
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        return gradeService.deleteStudent(id) ? ResponseEntity.ok().build() 
                                              : ResponseEntity.notFound().build();
    }
    
    // Add grade to student
    @PostMapping("/{id}/grades")
    public ResponseEntity<Student> addGrade(@PathVariable Long id, 
                                          @RequestBody Map<String, Double> request) {
        double grade = request.get("grade");
        Student student = gradeService.addGradeToStudent(id, grade);
        return student != null ? ResponseEntity.ok(student) 
                               : ResponseEntity.notFound().build();
    }
    
    // Get class statistics
    @GetMapping("/statistics")
    public Map<String, Object> getClassStatistics() {
        return gradeService.getClassStatistics();
    }
}
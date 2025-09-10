package com.gradetracker.repository;

import com.gradetracker.model.Student;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class StudentRepository {
    private final List<Student> students = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);
    
    public List<Student> findAll() {
        return new ArrayList<>(students);
    }
    
    public Optional<Student> findById(Long id) {
        return students.stream().filter(student -> student.getId().equals(id)).findFirst();
    }
    
    public Student save(Student student) {
        if (student.getId() == null) {
            student.setId(idGenerator.getAndIncrement());
            students.add(student);
        } else {
            int index = findIndexById(student.getId());
            if (index >= 0) {
                students.set(index, student);
            } else {
                students.add(student);
            }
        }
        return student;
    }
    
    public void deleteById(Long id) {
        students.removeIf(student -> student.getId().equals(id));
    }
    
    private int findIndexById(Long id) {
        for (int i = 0; i < students.size(); i++) {
            if (students.get(i).getId().equals(id)) {
                return i;
            }
        }
        return -1;
    }
}
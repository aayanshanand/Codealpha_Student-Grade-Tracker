package com.gradetracker.model;

import java.util.ArrayList;
import java.util.List;

public class Student {
    private Long id;
    private String name;
    private List<Double> grades;
    
    public Student() {
        this.grades = new ArrayList<>();
    }
    
    public Student(Long id, String name) {
        this.id = id;
        this.name = name;
        this.grades = new ArrayList<>();
    }
    
    public Student(Long id, String name, List<Double> grades) {
        this.id = id;
        this.name = name;
        this.grades = grades != null ? grades : new ArrayList<>();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public List<Double> getGrades() {
        return grades;
    }
    
    public void setGrades(List<Double> grades) {
        this.grades = grades != null ? grades : new ArrayList<>();
    }
    
    // Utility methods
    public double getAverage() {
        if (grades.isEmpty()) return 0.0;
        return grades.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
    }
    
    public double getHighestGrade() {
        if (grades.isEmpty()) return 0.0;
        return grades.stream().mapToDouble(Double::doubleValue).max().orElse(0.0);
    }
    
    public double getLowestGrade() {
        if (grades.isEmpty()) return 0.0;
        return grades.stream().mapToDouble(Double::doubleValue).min().orElse(0.0);
    }
    
    public void addGrade(Double grade) {
        this.grades.add(grade);
    }
}
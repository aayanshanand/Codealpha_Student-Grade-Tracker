package com.gradetracker.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class Student {
    private Long id;
    
    @NotBlank(message = "Student name is required")
    private String name;
    
    @NotNull(message = "Grades are required")
    private List<Double> grades;
    
    private double average;
    private double highest;
    private double lowest;
    
    // Constructors
    public Student() {
        this.grades = new ArrayList<>();
    }
    
    @SuppressWarnings("OverridableMethodCallInConstructor")
    public Student(Long id, String name, List<Double> grades) {
        this.id = id;
        this.name = name;
        this.grades = grades != null ? grades : new ArrayList<>();
        calculateStatistics();
    }
    
    // Calculate statistics
    public void calculateStatistics() {
        if (grades.isEmpty()) {
            this.average = 0.0;
            this.highest = 0.0;
            this.lowest = 0.0;
            return;
        }
        
        double sum = 0.0;
        double max = grades.get(0);
        double min = grades.get(0);
        
        for (double grade : grades) {
            sum += grade;
            if (grade > max) max = grade;
            if (grade < min) min = grade;
        }
        
        this.average = sum / grades.size();
        this.highest = max;
        this.lowest = min;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public List<Double> getGrades() { return grades; }
    public void setGrades(List<Double> grades) { 
        this.grades = grades;
        calculateStatistics();
    }
    
    public double getAverage() { return average; }
    public double getHighest() { return highest; }
    public double getLowest() { return lowest; }
    
    // Add single grade
    public void addGrade(double grade) {
        this.grades.add(grade);
        calculateStatistics();
    }
    
    // Get total grades count
    public int getTotalGrades() {
        return grades.size();
    }
}
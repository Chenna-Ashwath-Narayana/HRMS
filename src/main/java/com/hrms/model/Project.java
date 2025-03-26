package com.hrms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    private String projectName;
    private String description; // Updated to match React component
    private double budget;
    private int projectDuration; // Updated to match React component
    private String status; // e.g., "In Progress", "Completed"
    private String clientName;
    private String fullDetails; // Added to match React component

    public Project() {}

    public Project(Long projectId, String projectName, String description, double budget, int projectDuration,
                   String status, String clientName, String fullDetails) {
        super();
        this.projectId = projectId;
        this.projectName = projectName;
        this.description = description;
        this.budget = budget;
        this.projectDuration = projectDuration;
        this.status = status;
        this.clientName = clientName;
        this.fullDetails = fullDetails;
    }

    // Getters and setters
    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getBudget() {
        return budget;
    }

    public void setBudget(double budget) {
        this.budget = budget;
    }

    public int getProjectDuration() {
        return projectDuration;
    }

    public void setProjectDuration(int projectDuration) {
        this.projectDuration = projectDuration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getFullDetails() {
        return fullDetails;
    }

    public void setFullDetails(String fullDetails) {
        this.fullDetails = fullDetails;
    }

    @Override
    public String toString() {
        return "Project [projectId=" + projectId + ", projectName=" + projectName + ", description="
                + description + ", budget=" + budget + ", projectDuration=" + projectDuration
                + ", status=" + status + ", clientName=" + clientName + ", fullDetails=" + fullDetails + "]";
    }
}

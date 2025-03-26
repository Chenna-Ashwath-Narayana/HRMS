package com.hrms.service;




import java.util.List;

import com.hrms.model.Project;

public interface ProjectService {
    Project addProject(Project project);
    Project updateProject(Long projectId, Project project);
    void deleteProject(Long projectId);
    List<Project> getAllProjects();
    Project getProjectById(Long projectId);
    
    long count();
    
}

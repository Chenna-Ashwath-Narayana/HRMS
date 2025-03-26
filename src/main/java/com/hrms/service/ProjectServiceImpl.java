package com.hrms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrms.model.Project;
import com.hrms.repo.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Project addProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Long id, Project updatedProject) {
        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        existingProject.setProjectName(updatedProject.getProjectName());
        existingProject.setDescription(updatedProject.getDescription()); // Updated
        existingProject.setBudget(updatedProject.getBudget());
        existingProject.setProjectDuration(updatedProject.getProjectDuration()); // Updated
        existingProject.setStatus(updatedProject.getStatus());
        existingProject.setClientName(updatedProject.getClientName());
        existingProject.setFullDetails(updatedProject.getFullDetails()); // Added

        return projectRepository.save(existingProject);
    }


    @Override
    public void deleteProject(Long projectId) {
        projectRepository.deleteById(projectId);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProjectById(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

	@Override
	public long count() {
		// TODO Auto-generated method stub
		return projectRepository.count();
	}
}


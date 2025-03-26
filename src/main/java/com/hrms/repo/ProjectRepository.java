package com.hrms.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hrms.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

	long  count();
}

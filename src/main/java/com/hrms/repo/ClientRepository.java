package com.hrms.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hrms.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

	public long count();
}

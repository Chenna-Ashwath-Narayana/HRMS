package com.hrms.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.model.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

	List<Notice> findTop5ByOrderByDateDesc();
}

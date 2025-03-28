package com.hrms.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.hrms.model.Notice;

public interface NoticeService {

	Notice addNotice(Notice notice);
    List<Notice> getAllNotices();
    Notice getNoticeById(Long noticeId);
    public Notice updateNotice(Long noticeId, Notice updatedNotice);
    
    List<Notice> getLatestNotices();
    void deleteNotice(Long noticeId);
    
    public Notice getLatestNotice();
    
}

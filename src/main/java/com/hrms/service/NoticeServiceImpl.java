package com.hrms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrms.model.Notice;
import com.hrms.repo.NoticeRepository;

@Service
public class NoticeServiceImpl implements NoticeService {

	@Autowired
    private NoticeRepository noticeRepository;

    @Override
    public Notice addNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    @Override
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    @Override
    public Notice getNoticeById(Long noticeId) {
        return noticeRepository.findById(noticeId).orElse(null);
    }

    @Override
    public List<Notice> getLatestNotices() {
        return noticeRepository.findTop5ByOrderByDateDesc();
    }

	@Override
	public void deleteNotice(Long noticeId) {
		noticeRepository.deleteById(noticeId);
		
	}
	
	@Override
	public Notice updateNotice(Long noticeId, Notice updatedNotice) {
        return noticeRepository.findById(noticeId).map(existingNotice -> {
            existingNotice.setNoticeTitle(updatedNotice.getNoticeTitle());
            existingNotice.setNoticeDetails(updatedNotice.getNoticeDetails());
            existingNotice.setDate(updatedNotice.getDate());
            existingNotice.setDepartment(updatedNotice.getDepartment());
            existingNotice.setIsImportant(updatedNotice.getIsImportant()); // ✅ Fix this
            return noticeRepository.save(existingNotice);
        }).orElseThrow(() -> new RuntimeException("Notice not found with ID: " + noticeId));
    }

}

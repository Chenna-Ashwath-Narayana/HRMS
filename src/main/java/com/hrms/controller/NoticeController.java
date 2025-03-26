package com.hrms.controller;



import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hrms.model.Notice;
import com.hrms.service.NoticeService;

@RestController
@RequestMapping("/notice")
@CrossOrigin(origins = "*")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    // Add a new notice
    @PostMapping("/add")
    public ResponseEntity<Notice> addNotice(@RequestBody Notice notice) {
        return ResponseEntity.ok(noticeService.addNotice(notice));
    }

    // Get all notices
    @GetMapping("/listNotices")
    public ResponseEntity<List<Notice>> getAllNotices() {
        return ResponseEntity.ok(noticeService.getAllNotices());
    }

    // Get notice by ID
    @GetMapping("get/{id}")
    public ResponseEntity<Notice> getNoticeById(@PathVariable Long id) {
        return ResponseEntity.ok(noticeService.getNoticeById(id));
    }

    // Get the latest notices for the dashboard
    @GetMapping("/latest")
    public ResponseEntity<List<Notice>> getLatestNotices() {
        return ResponseEntity.ok(noticeService.getLatestNotices());
    }
    
 // ✅ Update notice
    @PutMapping("/updateNotice/{noticeId}")
    public ResponseEntity<Notice> updateNotice(@PathVariable Long noticeId, @RequestBody Notice updatedNotice) {
        try {
            Notice notice = noticeService.updateNotice(noticeId, updatedNotice);
            return ResponseEntity.ok(notice);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/delete/{noticeId}")
    public void deleteNotice(@PathVariable Long noticeId) {
    	noticeService.deleteNotice(noticeId);
    }
}

package com.hrms.model;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "notices")
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    private String noticeTitle;
    private String noticeDetails;

    @Column(name = "notice_date")
    private LocalDate date;

    private String department;
    
    @Column(name = "is_important") // ✅ Ensure correct DB column mapping
    private boolean isImportant;

    public Notice() {
        super();
    }

    public Notice(Long noticeId, String noticeTitle, String noticeDetails, LocalDate date, String department, boolean isImportant) {
        super();
        this.noticeId = noticeId;
        this.noticeTitle = noticeTitle;
        this.noticeDetails = noticeDetails;
        this.date = date;
        this.department = department;
        this.isImportant = isImportant;
    }

    // ✅ Ensure getter and setter follow proper naming conventions
    public Long getNoticeId() {
        return noticeId;
    }

    public void setNoticeId(Long noticeId) {
        this.noticeId = noticeId;
    }

    public String getNoticeTitle() {
        return noticeTitle;
    }

    public void setNoticeTitle(String noticeTitle) {
        this.noticeTitle = noticeTitle;
    }

    public String getNoticeDetails() {
        return noticeDetails;
    }

    public void setNoticeDetails(String noticeDetails) {
        this.noticeDetails = noticeDetails;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    // ✅ Correct getter name
    public boolean getIsImportant() {
        return isImportant;
    }

    // ✅ Correct setter name
    public void setIsImportant(boolean isImportant) {
        this.isImportant = isImportant;
    }

    @Override
    public String toString() {
        return "Notice [noticeId=" + noticeId + ", noticeTitle=" + noticeTitle + ", noticeDetails=" + noticeDetails
                + ", date=" + date + ", department=" + department + ", isImportant=" + isImportant + "]";
    }
}

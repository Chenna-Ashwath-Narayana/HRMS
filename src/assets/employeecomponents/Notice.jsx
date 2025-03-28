import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../employeecomponentsstyles/Notices.css'; // ✅ Import CSS file

const Notice = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:9000/notice/listNotices');
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="notice-container">
      <h1 className="notice-title">📢 Latest Notices</h1>

      <div className="employeenotice-box">
        {notices.length > 0 ? (
          <div>
            {notices.map((notice) => (
              <div key={notice.noticeId} className="notice-card">
                <h2>{notice.noticeTitle}</h2>
                <p><strong>📁 Department:</strong> {notice.department}</p>
                <p><strong>📅 Date:</strong> {new Date(notice.noticeDate).toLocaleDateString()}</p>
                <p className={`notice-important ${notice.isImportant ? 'text-red' : 'text-green'}`}>
                  <strong>⚠️ Important:</strong> {notice.isImportant ? 'Yes' : 'No'}
                </p>
                <p>{notice.noticeDetails}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No notices available.</p>
        )}
      </div>
    </div>
  );
};

export default Notice;

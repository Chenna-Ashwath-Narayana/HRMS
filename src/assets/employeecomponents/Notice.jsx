import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Notices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices.map((notice) => (
          <div key={notice.noticeId} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{notice.noticeTitle}</h2>
            <p className="text-gray-600 text-sm mb-2">Department: {notice.department}</p>
            <p className="text-gray-600 text-sm mb-2">Date: {new Date(notice.noticeDate).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-2">
              <strong>Important:</strong> {notice.isImportant ? 'Yes' : 'No'}
            </p>
            <p className="text-gray-700">{notice.noticeDetails}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;

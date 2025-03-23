// src/assets/admincomponents/AdminUserContext.js

import React, { createContext, useContext, useState } from 'react';

const AdminUserContext = createContext();

export const AdminUserProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null); // Adjust initial state as necessary

  return (
    <AdminUserContext.Provider value={{ adminUser, setAdminUser }}>
      {children}
    </AdminUserContext.Provider>
  );
};

export const useAdminUser = () => {
  const context = useContext(AdminUserContext);
  if (context === undefined) {
    throw new Error('useAdminUser must be used within an AdminUserProvider');
  }
  return context;
};
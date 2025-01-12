import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState('guest');

    useEffect(() => {
      const user = Cookies.get('user');
      try {
        if (user) {
          const parsedUser = JSON.parse(user);
          setRole(parsedUser.role || 'guest');
        }
      } catch (error) {
        console.error('Error parsing user data from cookies:', error);
        setRole('guest');
      }
    }, []);

    return (
      <RoleContext.Provider value={{ role, setRole }}>
        {children}
      </RoleContext.Provider>
    );
};

export const useRole = () => useContext(RoleContext);

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('portal_session');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username, password) => {
    // Simulated enterprise credential matrix evaluation
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      const session = { name: 'Dr. B Ramesh', role: 'ADMIN', campus: 'Main Campus' };
      localStorage.setItem('portal_session', JSON.stringify(session));
      setUser(session);
      return { success: true };
    } else if (username.toLowerCase() === 'user' && password === 'user123') {
      const session = { name: 'Saranya Loganathan', role: 'USER', campus: 'South Campus' };
      localStorage.setItem('portal_session', JSON.stringify(session));
      setUser(session);
      return { success: true };
    }
    return { success: false, error: 'Invalid profile key credentials.' };
  };

  const logout = () => {
    localStorage.removeItem('portal_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
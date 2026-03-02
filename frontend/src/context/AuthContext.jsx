import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  const login = ({ token: jwt, role: nextRole }) => {
    localStorage.setItem('token', jwt);
    localStorage.setItem('role', nextRole);
    setToken(jwt);
    setRole(nextRole);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
  };

  const value = useMemo(() => ({ token, role, isLoggedIn: Boolean(token), login, logout }), [token, role]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioId, setUsuarioId] = useState(null);
  const [usuarioGmail, setUsuarioGmail] = useState(null);

  useEffect(() => {
    const storedUsuarioId = localStorage.getItem('usuarioId');
    const storedUsuarioGmail = localStorage.getItem('usuarioGmail');
    
    if (storedUsuarioId && storedUsuarioGmail) {
      setUsuarioId(storedUsuarioId);
      setUsuarioGmail(storedUsuarioGmail);
    }
  }, []);

  const login = (id, gmail) => {
    setUsuarioId(id);
    setUsuarioGmail(gmail);
    localStorage.setItem('usuarioId', id);
    localStorage.setItem('usuarioGmail', gmail);
  };

  const logout = () => {
    setUsuarioId(null);
    setUsuarioGmail(null);
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioGmail');
  };

  return (
    <AuthContext.Provider value={{ usuarioId, usuarioGmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

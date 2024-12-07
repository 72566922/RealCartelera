import React, { createContext, useContext, useState, useEffect } from 'react'; 
// Importa React y hooks necesarios: createContext para crear el contexto, useContext para consumirlo,
// useState para manejar el estado local, y useEffect para efectos secundarios

const AuthContext = createContext(); 
// Crea un contexto llamado AuthContext para manejar la autenticación a nivel global

export const AuthProvider = ({ children }) => {
  // Crea el componente AuthProvider que envuelve a los hijos (children) y proporciona el contexto de autenticación

  const [usuarioId, setUsuarioId] = useState(null); // Estado para almacenar el ID del usuario
  const [usuarioGmail, setUsuarioGmail] = useState(null); // Estado para almacenar el correo electrónico (gmail) del usuario

  useEffect(() => {
    // useEffect se ejecuta una vez cuando el componente se monta (solo al inicio)
    const storedUsuarioId = localStorage.getItem('usuarioId'); // Recupera el ID del usuario desde localStorage
    const storedUsuarioGmail = localStorage.getItem('usuarioGmail'); // Recupera el correo del usuario desde localStorage
    
    // Si el ID y el correo están almacenados en localStorage, se actualiza el estado
    if (storedUsuarioId && storedUsuarioGmail) {
      setUsuarioId(storedUsuarioId);
      setUsuarioGmail(storedUsuarioGmail);
    }
  }, []); // El array vacío [] asegura que el efecto solo se ejecute una vez cuando el componente se monta

  const login = (id, gmail) => {
    // Función para iniciar sesión, toma el ID y el correo del usuario
    setUsuarioId(id); // Actualiza el estado de usuarioId
    setUsuarioGmail(gmail); // Actualiza el estado de usuarioGmail
    localStorage.setItem('usuarioId', id); // Almacena el ID en localStorage
    localStorage.setItem('usuarioGmail', gmail); // Almacena el correo en localStorage
  };

  const logout = () => {
    // Función para cerrar sesión
    setUsuarioId(null); // Limpia el estado de usuarioId
    setUsuarioGmail(null); // Limpia el estado de usuarioGmail
    localStorage.removeItem('usuarioId'); // Elimina el ID del usuario de localStorage
    localStorage.removeItem('usuarioGmail'); // Elimina el correo del usuario de localStorage
  };

  return (
    <AuthContext.Provider value={{ usuarioId, usuarioGmail, login, logout }}>
      {/* Proporciona el contexto a los componentes hijos */}
      {children} {/* Renderiza los hijos dentro del proveedor del contexto */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
// Hook personalizado para acceder a los valores del contexto de autenticación (usuarioId, usuarioGmail, login, logout)

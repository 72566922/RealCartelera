import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const { login } = useAuth(); // Obtener la función login del contexto
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/login', {
        gmail,
        password,
      });

      if (response.status === 200) {
        // Almacenar el ID y Gmail del usuario en el contexto
        login(response.data.id, response.data.gmail);

        // Limpiar los campos después del inicio de sesión exitoso
        setGmail('');
        setPassword('');

        setSuccessMessage('¡Inicio de sesión exitoso!');
        setErrorMessage('');
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error en el inicio de sesión. Verifique sus credenciales.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Gmail:</label>
            <input
              type="email"
              className="form-control"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
        <p className="text-center mt-3">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
        {errorMessage && <p className="text-danger mt-3 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-success mt-3 text-center">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Login;

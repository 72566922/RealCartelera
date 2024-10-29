import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
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
        // Almacenar el ID y Gmail del usuario en localStorage
        localStorage.setItem('usuarioId', response.data.id);
        localStorage.setItem('usuarioGmail', response.data.gmail);

        setSuccessMessage('Login successful!');
        setErrorMessage('');

        // Recargar la página después de un login exitoso
        window.location.reload();
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Gmail:</label>
          <input
            type="email"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Login;

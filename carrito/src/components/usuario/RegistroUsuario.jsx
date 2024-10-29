import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegistroUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [celular, setCelular] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Función para registrar el usuario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const usuarioData = { nombre, gmail, password, celular };

        try {
            const response = await axios.post('http://localhost:8080/api/usuarios/register', usuarioData);

            if (response.status === 200) {
                setMensaje('Usuario registrado con éxito');
                // Limpiar los campos del formulario de usuario
                setNombre('');
                setGmail('');
                setPassword('');
                setCelular('');
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error.response?.data || error.message);
            setMensaje('Error al registrar el usuario');
        }
    };

    return (
        <div>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
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
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Celular:</label>
                    <input
                        type="text"
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrar Usuario</button>
            </form>
            {mensaje && <p>{mensaje}</p>}

            <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
    );
};

export default RegistroUsuario;

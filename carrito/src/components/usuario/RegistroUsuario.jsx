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
                console.log('Usuario registrado:', response.data);
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
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="text-center mb-4">Registro de Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="mb-3">
                        <label className="form-label">Celular:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Registrar Usuario</button>
                </form>
                {mensaje && <p className="text-center mt-3">{mensaje}</p>}

                <p className="text-center mt-3">
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default RegistroUsuario;

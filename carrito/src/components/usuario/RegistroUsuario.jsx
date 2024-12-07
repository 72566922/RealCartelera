import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado
import axios from 'axios'; // Importa axios para realizar peticiones HTTP
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom para crear enlaces entre páginas
import { urlServer } from "../../service/urlServer.js";

const RegistroUsuario = () => {
    // Definición de los estados para cada campo del formulario y el mensaje de respuesta
    const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del usuario
    const [gmail, setGmail] = useState(''); // Estado para almacenar el correo del usuario
    const [password, setPassword] = useState(''); // Estado para almacenar la contraseña del usuario
    const [celular, setCelular] = useState(''); // Estado para almacenar el celular del usuario
    const [mensaje, setMensaje] = useState(''); // Estado para almacenar el mensaje de éxito o error

    // Función para manejar el envío del formulario y registrar al usuario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado de enviar el formulario (recarga de la página)

        // Crea un objeto con los datos del usuario
        const usuarioData = { nombre, gmail, password, celular };

        try {
            // Realiza una petición POST a la API para registrar al usuario
            const response = await axios.post(`${urlServer}/api/usuarios/register`, usuarioData);

            // Si la respuesta es exitosa (código 200)
            if (response.status === 200) {
                setMensaje('Usuario registrado con éxito'); // Establece el mensaje de éxito
                console.log('Usuario registrado:', response.data); // Muestra la respuesta en la consola
                // Limpia los campos del formulario después de un registro exitoso
                setNombre('');
                setGmail('');
                setPassword('');
                setCelular('');
            }
        } catch (error) {
            // En caso de error, muestra un mensaje de error
            console.error('Error al registrar el usuario:', error.response?.data || error.message);
            setMensaje('Error al registrar el usuario'); // Establece el mensaje de error
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            {/* Contenedor principal para centrar el formulario en la pantalla */}
            <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
                {/* Tarjeta para el formulario de registro */}
                <h2 className="text-center mb-4">Registro de Usuario</h2>
                {/* Título del formulario */}
                <form onSubmit={handleSubmit}>
                    {/* Formulario que ejecuta handleSubmit al enviarlo */}
                    <div className="mb-3">
                        <label className="form-label">Nombre:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)} // Actualiza el estado de nombre
                            required // Marca el campo como obligatorio
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gmail:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={gmail}
                            onChange={(e) => setGmail(e.target.value)} // Actualiza el estado de gmail
                            required // Marca el campo como obligatorio
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de password
                            required // Marca el campo como obligatorio
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Celular:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)} // Actualiza el estado de celular
                            required // Marca el campo como obligatorio
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Registrar Usuario</button>
                    {/* Botón para enviar el formulario */}
                </form>
                {/* Muestra el mensaje de éxito o error, si existe */}
                {mensaje && <p className="text-center mt-3">{mensaje}</p>}

                <p className="text-center mt-3">
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </p>
                {/* Enlace para redirigir al formulario de inicio de sesión */}
            </div>
        </div>
    );
};

export default RegistroUsuario;

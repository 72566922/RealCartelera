import React from "react";
import './RegisterComponent2.css';
import { FaUser, FaLock,  FaPhone } from "react-icons/fa"; 
import { Link } from "react-router-dom"; 

function RegisterComponent() {
    return (
        <div className="wrapper"> {/* Asegúrate de usar la clase wrapper */}
            <form>
                <h1>Register Page</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Número" required />
                    <FaPhone className="icon" />
                </div>
                <div className="input-box">
                    <input type="email" placeholder="Correo" required />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required />
                    <FaLock className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Confirm Password" required />
                    <FaLock className="icon" />
                </div>
                
                <button type="submit">Register</button>
            </form>
            <div className="register-link">
                <p>Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
            </div>
        </div>
    );
}

export default RegisterComponent;
import React from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

function LoginComponent() {
    // Función para redirigir a la página de registro

    return (
        <div className='wrapper'>
            <form>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account? <Link to="/register"> Register</Link></p>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;
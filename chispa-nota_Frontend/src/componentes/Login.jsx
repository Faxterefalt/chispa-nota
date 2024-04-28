import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  

  return (
    <div className="login-container">
      <h2>No te quedes atrás en Chispanota</h2>
      <h3>Inicia sesión</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Tu Correo Electrónico o Tu Usuario</label><br />
        <input type="text" id="email" name="email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" onChange={(e) => setEmail(e.target.value)} /><br />
        <label htmlFor="password">Tu Contraseña:</label><br />
        <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} /><br />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;

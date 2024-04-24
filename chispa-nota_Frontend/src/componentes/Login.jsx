import "../hojas-de-estilo/Login.css";
import React, { useState } from 'react';
import axios from 'axios';
const endpoint = "http://localhost:8000/api";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const url= `${endpoint}/cuentas`;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url, {
        email: email,
        password: password
      });

      console.log(response.data); // Manejar la respuesta del servidor como desees
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
 
    <div className="login-container">
      
      <h2>No te quedes atras en Chispanota</h2>
      <h3>Inicia sesion</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Tu Correo Electrónico o Tu Usuario</label><br />
        <input type="text" id="email" name="email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" /><br />
        <label htmlFor="password">Tu Contraseña:</label><br />
        <input type="password" id="password" name="password" required /><br />
        <button type="submit">Iniciar sesion</button>
      </form>
    </div>
  );
}
function Background(){
  return(
  <div className="login-background">
    <Login/>
    <img src="/imagenes/fondo3.jpg" alt="Fondo 3" />
  </div>
  );
}
export default Background;


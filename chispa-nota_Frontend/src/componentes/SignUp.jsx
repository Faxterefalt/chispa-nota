import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(''); // Cambio de 'login' a 'user'
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/cuentas', {
        nombre_usu: nombre,
        apellido_pa_usu: apellidoPaterno,
        apellido_ma_usu: apellidoMaterno,
        email: email,
        user: user, // Cambio de 'login' a 'user'
        password: password
      });

      console.log(response.data); // Manejar la respuesta del servidor como desees
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Crea una nueva cuenta</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label><br />
        <input type="text" id="nombre" name="nombre" required onChange={(e) => setNombre(e.target.value)} /><br />
        <label htmlFor="apellidoPaterno">Apellido Paterno:</label><br />
        <input type="text" id="apellidoPaterno" name="apellidoPaterno" required onChange={(e) => setApellidoPaterno(e.target.value)} /><br />
        <label htmlFor="apellidoMaterno">Apellido Materno:</label><br />
        <input type="text" id="apellidoMaterno" name="apellidoMaterno" required onChange={(e) => setApellidoMaterno(e.target.value)} /><br />
        <label htmlFor="email">Correo Electrónico:</label><br />
        <input type="text" id="email" name="email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" onChange={(e) => setEmail(e.target.value)} /><br />
        <label htmlFor="user">Nombre de Usuario:</label><br />
        <input type="text" id="user" name="user" required onChange={(e) => setUser(e.target.value)} /><br /> {/* Cambio de 'login' a 'user' */}
        <label htmlFor="password">Contraseña:</label><br />
        <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} /><br />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default SignUp;

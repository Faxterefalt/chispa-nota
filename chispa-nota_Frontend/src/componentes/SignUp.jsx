import React, { useState } from 'react';
import "../hojas-de-estilo/SignUp.css";
import axios from 'axios';

function SignUp() {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/cuentas', {
        nombre_usu: nombre,
        apellido_pa_usu: apellidoPaterno,
        apellido_ma_usu: apellidoMaterno,
        email: email,
        user: user,
        password: password
      });

      console.log(response.data); 
      setNombre('');
      setApellidoPaterno('');
      setApellidoMaterno('');
      setEmail('');
      setUser('');
      setPassword('');

      setShowSuccessMessage(true);
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      setShowSuccessMessage('');
      setErrorMessage('Error al crear la cuenta');
      
    }
  };

  return (
    <div className="signup-container">
       <h2>Prueba Chispanota desde hoy</h2>
      <h3>Es gratis, no tienes límites</h3>
      {showSuccessMessage && (
        <div className="success-message">Cuenta creada exitosamente</div>)}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre(s):</label><br />
        <input type="text" id="nombre" name="nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} /><br />
        <label htmlFor="apellidoPaterno">Apellido Paterno:</label><br />
        <input type="text" id="apellidoPaterno" name="apellidoPaterno" required value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} /><br />
        <label htmlFor="apellidoMaterno">Apellido Materno:</label><br />
        <input type="text" id="apellidoMaterno" name="apellidoMaterno" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} /><br />
        <label htmlFor="email">Correo Electrónico:</label><br />
        <input type="email" id="email" name="email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label htmlFor="user">Nombre de Usuario:</label><br />
        <input type="text" id="user" name="user" required value={user} onChange={(e) => setUser(e.target.value)} /><br />
        <label htmlFor="password">Contraseña:</label><br />
        <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button type="submit">Registrarse</button>

      </form>
    </div>
  );
}
function Background(){
  return(
  <div className="SignUp-background">
    <SignUp/>
    <img src="/imagenes/fondo3.jpg" alt="Fondo 3" />
  </div>
  );
}
export default Background;
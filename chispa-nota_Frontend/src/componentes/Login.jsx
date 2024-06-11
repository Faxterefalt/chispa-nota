import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../hojas-de-estilo/Login.css";
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

function Login() {
  const [credentials, setCredentials] = useState({
    emailOrUser: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.emailOrUser || !credentials.password) {
      setError('Por favor, ingresa tu correo electrónico/usuario y contraseña.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/cuentas/login', credentials);
      console.log(response.data);
      setError('');
      navigate('/mainpage', { state: { accountId: response.data.id } }); // Pasar la ID del usuario como parte del objeto de estado de la ubicación
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };
  
  // En el método responseGoogle del componente Login
  const responseGoogle = async (response) => {
    try {
      const serverResponse = await axios.post('http://localhost:8000/api/cuentas/google-login', { code: response.code });
      console.log(serverResponse.data);
      setError('');
      navigate(`/mainpage/${serverResponse.data.id}`, { state: { accountId: serverResponse.data.id } });  // Navegar a /mainpage/:idUser con estado
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };
      

  return (
    <div className="login-container">
      <h2>No te quedes atrás en Chispanota</h2>
      <h3>Inicia sesión</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailOrUser">Tu Correo Electrónico o Tu Usuario</label>
        <input type="text" id="emailOrUser" name="emailOrUser" required onChange={handleChange} />
        <label htmlFor="password">Tu Contraseña:</label>
        <input type="password" id="password" name="password" required onChange={handleChange} />
        
        <div className="button-container">
        <button type="submit">Iniciar sesión</button>
        </div>
        {error && <p className="error">{error}</p>}
        <br></br>
        <div className='google-login'>
        <GoogleLogin
          clientId="your-google-client-id"
          buttonText="Iniciar sesión con Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          responseType='code'
        />
        </div>
        
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

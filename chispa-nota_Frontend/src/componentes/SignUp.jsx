import "../hojas-de-estilo/SignUp.css";
import axios from 'axios';
const endpoint = "http://localhost:8000/api";

function SignUp() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url= `${endpoint}/cuentas`;
    try {
      const response = await axios.post(url, formData);
      console.log(response.data); // Maneja la respuesta del servidor según sea necesario
      // Redirigir al usuario al inicio después de enviar el formulario
      window.location.href = "/";
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };
  return (
 
    <div className="SignUp-container">
      
      <h2>Prueba Chispanota desde hoy</h2>
      <h3>Es gratis, no tienes límites</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Tu Nombre:</label><br />
        <input type="text" id="nombre" name="nombre" required /><br />
        <label htmlFor="apellido">Tu Apellido Paterno:</label><br />
        <input type="text" id="apellido" name="apellidoPa" required /><br />
        <label htmlFor="apellido">Tu Apellido Materno:</label><br />
        <input type="text" id="apellido" name="apellidoMa" /><br />
        <label htmlFor="email">Tu Dirección de Correo Electrónico:</label><br />
        <input type="email" id="email" name="email" required /><br />
        <label htmlFor="usuario">Tu Usuario:</label><br />
        <input type="text" id="usuario" name="usuario" required /><br />
        <label htmlFor="password">Tu Contraseña:</label><br />
        <input type="password" id="password" name="password" required /><br />
        <button type="submit">Terminar Registro</button>
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


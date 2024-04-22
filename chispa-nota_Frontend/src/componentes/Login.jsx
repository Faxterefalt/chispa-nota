import "../hojas-de-estilo/Login.css";

function Login() {
  return (
    <div className="login-container">
      <h2>Prueba Chispanota desde hoy</h2>
      <h3>Es gratis, no tienes límites</h3>
      <form action="#" method="POST">
        <label htmlFor="nombre">Tu Nombre:</label><br />
        <input type="text" id="nombre" name="nombre" required /><br />
        <label htmlFor="apellido">Tu Apellido:</label><br />
        <input type="text" id="apellido" name="apellido" required /><br />
        <label htmlFor="email">Tu Dirección de Correo Electrónico:</label><br />
        <input type="text" id="email" name="email" required /><br />
        <label htmlFor="password">Tu Contraseña:</label><br />
        <input type="password" id="password" name="password" required /><br />
        <button type="submit">Terminar Registro</button>
      </form>
    </div>
  );
}

export default Login;


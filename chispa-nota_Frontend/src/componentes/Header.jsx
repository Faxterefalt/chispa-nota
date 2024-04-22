import React from "react";
import { Link } from "react-router-dom";
import "../hojas-de-estilo/Header.css"; 

function Header() {
  return (
    <header>
      <div className="header-titulo">
        <h1>Chispanota</h1>
      </div>
      <div className="acciones-usuario">
        <Link to="/signup">Ingrese Aquí</Link>
      </div>
      <div className="acciones-usuario">
        <Link to="/login">Regístrate Gratis</Link>
      </div>
    </header>
  );
}

export default Header;
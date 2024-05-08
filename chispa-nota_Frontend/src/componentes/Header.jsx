import React from "react";
import { Link } from "react-router-dom";
import "../hojas-de-estilo/Header.css"; 

function Header({ showUserActions }) {
  return (
    <header>
      <div className="header-titulo">
        <h1>Chispanota</h1>
      </div>
      {showUserActions && (
        <div className="acciones-usuario">
          <Link to="/Login">Ingrese Aquí</Link>
        </div>
      )}
      {showUserActions && (
        <div className="acciones-usuario">
          <Link to="/SignUp">Regístrate Gratis</Link>
        </div>
      )}
    </header>
  );
}

export default Header;

import React from "react";

import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../hojas-de-estilo/MainPage.css";

function MainPage() {
  return (
    <div>
      <header>
      <div className="header-titulo">
        <h1>Chispanota</h1>
      </div>
      
     
      </header>
      <section className="contenedor-flex">
        <div className="contenido">
          {/* Contenido izquierdo */}
        </div>
        <div className="barra-opciones">
          {/* Contenedor de las opciones */}
          <Link to="/Pizarra"><button>Pizarra</button></Link>
          <button>Carpetas</button>
          <button>Columnas</button>
          <Link to="/tareas"><button>Lista de Tareas</button></Link>
          
        </div>
      </section>
      <div><Footer /></div>
    </div>
  );
}

export default MainPage;

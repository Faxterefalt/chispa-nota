import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../hojas-de-estilo/HomePage.css";

function HomePage() {
  return (
    <div>
      <Header showUserActions={true} /> {/* Aquí pasamos showUserActions como true */}
      <section className="contenedor-flex">
        <div className="contenido">
          {/* Corrige la ruta de la imagen */}
          <img src="/imagenes/fondo4.jpg" alt="Fondo 4" />
        </div>
        <div className="contenido">
          <h2 className="titulo-inicio">Organízate, crea y diviértete</h2>
          <p className="texto-inicio">
            Chispanota es una herramienta fácil e intuitiva que permite organizar
            tus ideas y proyectos de la mejor manera.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;

import React from 'react';
import './MainLayout.css'; 
// Definir el color morado como una constante

function Header() {
  return (
    <header className='header'>
      {/* Contenido del encabezado */}
      <h1>Chispanota</h1>
      {/* Botones */}
      <div className="btn-container">
    <button className="btn">Ingresar</button>
    <button className="btn">Registrarte Gratis</button>
  </div>
    </header>
  );
}


function Content() {
  return (
    <div className="content">
      {/* Logo y tagline */}
      
      {/* Contenido dividido en dos partes */}
      <div className="half-container">
        <div className="half" > 
          
        </div>
        <div className="half">
          {/* Contenido de la segunda mitad */}
          <h1 className="logo">Chispanota</h1>
          <p className="tagline">Organízate, crea y diviértete</p><br></br>
          <p className='texto'> 
Chispanota es una plataforma diseñada para facilitar la organización de ideas y 
proyectos de manera intuitiva. Te permite crear tableros virtuales donde puedes 
agregar notas, imágenes, enlaces y otros elementos para dar forma a tus pensamientos
 y proyectos. Esta herramienta está pensada para ayudarte a visualizar tus ideas de 
 manera clara y ordenada, facilitando así la planificación y ejecución de tus proyectos.</p>
      
        </div>
      </div>
    </div>
  );
}

function MainLayout() {
  return (
    <div className="main-layout">
      {/* Encabezado */}
      <Header />
      
      {/* Contenido */}
      <Content />
    </div>
  );
}

export default MainLayout;
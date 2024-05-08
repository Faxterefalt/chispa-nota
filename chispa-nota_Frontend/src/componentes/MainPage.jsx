import "../hojas-de-estilo/MainPage.css";
import Header from "./Header";
import Footer from "./Footer";

function MainPage() {
  return (
    <div>
      <Header />
      <section className="contenedor-flex">
        <div className="contenido">
          {/* Corrige la ruta de la imagen */}
          <img src="/imagenes/fondo4.jpg" alt="Fondo 4" />
        </div>
        <div className="contenido">
          <h2>Organízate, crea y diviértete</h2>
          <p className="texto-inicio">
            
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MainPage;
import '../../hojas-de-estilo/notas-tareas/Tareas.css';
import chispanotaLogo from '../../imagenes/Chispanota-logocuadradov3.png';
import ListaDeTareas from '../notas-tareas/ListaDeTareas';


function Tareas() {
  return (
    <div className="Tareas">

      <div className='chispanota-logo-contenedor'>
        <img 
          src={chispanotaLogo}
          className='chispanota-logo'
        />
      </div>
      <div className='tareas-lista-principal'>
        <h1>Mis Tareas</h1>
        <ListaDeTareas />
      </div>
    </div>
  );
}

export default Tareas;
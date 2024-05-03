import '../../hojas-de-estilo/notas-tareas/Tarea.css'; 
import { AiOutlineCloseCircle } from "react-icons/ai";

function Tarea({ tarea, completarTarea, eliminarTarea }){
  
  const handleDragStart = (event)=>{
    event.dataTransfer.setData('tareaId',tarea.id);
  };

  const handleCompletaTarea = () => {
    completarTarea(tarea.id);
  };

  const handleEliminaTarea = () => {
    eliminarTarea(tarea.id);
  };

  return(
    <div
      className={tarea.completada ? 'tarea-contenedor completada' : 'tarea-contenedor'}
      draggable='true'
      onDragStart={handleDragStart}
    >
      <div
        className='tarea-texto'
        onClick={handleCompletaTarea}
      >
        {tarea.texto}
      </div>
      <div
        className='tarea-contenedor-iconos'
        onClick={handleEliminaTarea}
      >
        <AiOutlineCloseCircle className='tarea-icono' />
      </div>
    </div>
  );
}

export default Tarea;
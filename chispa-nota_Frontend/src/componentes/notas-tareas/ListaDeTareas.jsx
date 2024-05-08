import React, { useState } from 'react';
import TareaFormulario from './Formulario';
import  '../../hojas-de-estilo/notas-tareas/ListaDeTareas.css';
import Tarea from './Tarea';

function ListaDeTareas() {
  const [tareas, setTareas] = useState([]);

  const handleDrop = (event) => {
    const tareaId = event.dataTransfer.getData('tareaId');
    const tareaArrastrada = tareas.find((tarea) => tarea.id === tareaId);
    if (tareaArrastrada) {
      // Actualizar posición de la tarea en la lista
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const agregarTarea = (tarea) => {
    if (tarea.texto.trim()) {
      tarea.texto = tarea.texto.trim();
      const tareasActualizadas = [tarea, ...tareas];
      setTareas(tareasActualizadas);
    }
  };

  const eliminarTarea = (id) => {
    const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasActualizadas);
  };

  const completarTarea = (id) => {
    const tareasActualizadas = tareas.map((tarea) => {
      if (tarea.id === id) {
        tarea.completada = !tarea.completada;
      }
      return tarea;
    });

    setTareas(tareasActualizadas);
  };

  return (
    <>
      <TareaFormulario onSubmit={agregarTarea} />
      <div
        className='tareas-lista-contenedor'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {tareas.map((tarea) => (
          <Tarea
            key={tarea.id}
            tarea={tarea}
            completarTarea={completarTarea}
            eliminarTarea={eliminarTarea}
          />
        ))}
      </div>
    </>
  );
}

export default ListaDeTareas;

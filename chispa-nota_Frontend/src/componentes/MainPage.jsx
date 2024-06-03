import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function MainPage() {
  const [notes, setNotes] = useState([]);
  const [dragId, setDragId] = useState();
  const [canvasImage, setCanvasImage] = useState(null); 
  const noteButtonRef = useRef();
  const notesAreaRef = useRef();

  useEffect(() => {
    const handleStorageChange = () => {
      const image = localStorage.getItem('canvasImage');
      setCanvasImage(image);
    };
    window.addEventListener('storage', handleStorageChange);
     // Limpiar el evento al desmontar el componente
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
},[]);

  const addNote = () => {
    const rect = noteButtonRef.current.getBoundingClientRect();
    setNotes((prevNotes) => [...prevNotes, { id: Math.random(), text: '', x: rect.left, y: rect.bottom }]);
  };

  const handleDragStart = (event, id) => {
    setDragId(id);
  };

  const handleDrag = (event) => {
    event.preventDefault();
    const notesAreaRect = notesAreaRef.current.getBoundingClientRect();
    let x = event.clientX;
    let y = event.clientY;
    if (x < notesAreaRect.left) x = notesAreaRect.left;
    if (y < notesAreaRect.top) y = notesAreaRect.top;
    if (x > notesAreaRect.right) x = notesAreaRect.right;
    if (y > notesAreaRect.bottom) y = notesAreaRect.bottom;
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === dragId ? { ...note, x, y } : note
      )
    );
  };

  const handleInputChange = (event, id) => {
    const newText = event.target.value;
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

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
          <button ref={noteButtonRef} onClick={addNote}>Notas</button>
          <button>Columnas</button>
          <Link to="/tareas"><button>Lista de Tareas</button></Link>
        </div>
      </section>
      
      {canvasImage && <img src={canvasImage} alt="Canvas" />}
      
      <div ref={notesAreaRef} onDragOver={(event) => event.preventDefault()} onDrag={handleDrag} style={{ flex: 1 }}>
        {notes.map((note) => (
          <div
            key={note.id}
            draggable
            onDragStart={(event) => handleDragStart(event, note.id)}
            style={{ position: 'absolute', left: `${note.x}px`, top: `${note.y}px`, cursor: 'move' }}
          >
            <textarea value={note.text} onChange={(event) => handleInputChange(event, note.id)} />
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default MainPage;
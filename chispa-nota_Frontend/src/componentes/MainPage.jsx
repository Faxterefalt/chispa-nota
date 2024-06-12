import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsTrash } from 'react-icons/bs';

import Carpeta from './Carpeta';
import { useLocation } from 'react-router-dom';

function MainPage() {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const noteButtonRef = useRef();
  const notesAreaRef = useRef();
  const [accountId, setAccountId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' && selectedId) {
        deleteItem(selectedId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedId]);

  useEffect(() => {
    if (location.state && location.state.accountId) {
      setAccountId(location.state.accountId);
      console.log("ID recibido desde Login:", location.state.accountId);
    }
  }, [location.state]);

  
  const addNote = () => {
    const rect = noteButtonRef.current.getBoundingClientRect();
    setNotes((prevNotes) => [...prevNotes, { id: Math.random(), text: '', x: rect.left, y: rect.bottom }]);
  };

  const addFolder = () => {
    const defaultFolderName = "Nueva Carpeta"; 
    setFolders([...folders, { id: Math.random(), name: defaultFolderName, isEditing: true }]);
  };
  

  const addColumn = () => {
    setColumns((prevColumns) => [...prevColumns, { id: Math.random(), taskLists: [] }]);
  };

  const addTaskListToColumn = (columnId) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId ? { ...column, taskLists: [...column.taskLists, { id: Math.random(), tasks: [] }] } : column
      )
    );
  };

  const addTaskToTaskListInColumn = (columnId, taskListId) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              taskLists: column.taskLists.map((taskList) =>
                taskList.id === taskListId ? { ...taskList, tasks: [...taskList.tasks, { id: Math.random(), text: '' }] } : taskList
              ),
            }
          : column
      )
    );
  };

  const handleFolderNameChange = (event, id) => {
    const newName = event.target.value;
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === id ? { ...folder, name: newName } : folder
      )
    );
  };
  
  const handleFolderBlur = (id) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === id ? { ...folder, isEditing: false } : folder
      )
    );
  };
  const folderContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '10px',
  };
  
  const folderItemStyle = {
    border: '1px solid black',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '5px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };
  const handleNoteChange = (event, id) => {
    const newText = event.target.value;
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  const handleTaskChange = (event, columnId, taskListId, taskId) => {
    const newText = event.target.value;
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              taskLists: column.taskLists.map((taskList) =>
                taskList.id === taskListId
                  ? {
                      ...taskList,
                      tasks: taskList.tasks.map((task) =>
                        task.id === taskId ? { ...task, text: newText } : task
                      ),
                    }
                  : taskList
              ),
            }
          : column
      )
    );
  };

  const deleteItem = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== id));
    setColumns((prevColumns) => prevColumns.filter((column) => column.id !== id));
  };

  const deleteTaskList = (columnId, taskListId) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              taskLists: column.taskLists.filter((taskList) => taskList.id !== taskListId),
            }
          : column
      )
    );
  };

  const deleteTask = (columnId, taskListId, taskId) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              taskLists: column.taskLists.map((taskList) =>
                taskList.id === taskListId
                  ? {
                      ...taskList,
                      tasks: taskList.tasks.filter((task) => task.id !== taskId),
                    }
                  : taskList
              ),
            }
          : column
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
          <Link to={{ pathname: "/Pizarra", search: `?accountId=${accountId}` }}>
            <button className="btn btn-primary">Pizarra</button>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Carpeta onCreateFolder={addFolder} />
          </div>
          <button className="btn btn-secondary" ref={noteButtonRef} onClick={addNote}>Notas</button>
          <button className="btn btn-secondary" onClick={addColumn}>Columnas</button>
        </div>
      </section>
      <div ref={notesAreaRef} style={{ flex: 1 }}>
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => setSelectedId(note.id)}
            style={{ 
              position: 'absolute', 
              left: `${note.x}px`, 
              top: `${note.y}px`, 
              border: '1px solid black', 
              padding: '10px', 
              margin: '10px', 
              backgroundColor: 'white', 
              borderRadius: '5px' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <textarea value={note.text} onChange={(event) => handleNoteChange(event, note.id)} style={{ width: '90%' }} />
              <i className="bi bi-x-circle" onClick={() => deleteItem(note.id)} style={{ cursor: 'pointer' }}></i>
            </div>
          </div>
        ))}
        <div className="folder-container" style={folderContainerStyle}>
          {folders.map((folder) => (
            <div key={folder.id} onClick={() => setSelectedId(folder.id)} style={folderItemStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <i className="bi bi-folder" style={{ fontSize: '1.5rem' }}></i> {/* Icono de carpeta Bootstrap */}
                <i className="bi bi-x-circle" onClick={() => deleteItem(folder.id)} style={{ cursor: 'pointer' }}></i>
              </div>
              {folder.isEditing ? (
                <input
                  type="text"
                  value={folder.name}
                  onChange={(event) => handleFolderNameChange(event, folder.id)}
                  onBlur={() => handleFolderBlur(folder.id)}
                  autoFocus
                />
              ) : (
                <p onClick={() => setFolders((prevFolders) =>
                  prevFolders.map((f) =>
                    f.id === folder.id ? { ...f, isEditing: true } : f
                  )
                )}>{folder.name}</p>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {columns.map((column) => (
            <div key={column.id} onClick={() => setSelectedId(column.id)} style={{ border: '1px solid black', padding: '10px', margin: '10px', backgroundColor: 'white', borderRadius: '5px', width: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Columna</h3>
                <i className="bi bi-x-circle" onClick={() => deleteItem(column.id)} style={{ cursor: 'pointer' }}></i>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => addTaskListToColumn(column.id)}>Lista de Tareas</button>
              {column.taskLists.map((taskList) => (
                <div key={taskList.id} style={{ border: '1px solid black', padding: '10px', margin: '10px', backgroundColor: 'lightgray', borderRadius: '5px', position: 'relative' }}>
                  <h4>Lista de Tareas</h4>
                  <i
                    className="bi bi-x-circle"
                    style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                    onClick={() => deleteTaskList(column.id, taskList.id)}
                  ></i>
                  <button className="btn btn-secondary btn-sm" onClick={() => addTaskToTaskListInColumn(column.id, taskList.id)}>+</button>
                  {taskList.tasks.map((task) => (
                    <div key={task.id} onClick={() => setSelectedId(task.id)} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                      <textarea value={task.text} onChange={(event) => handleTaskChange(event, column.id, taskList.id, task.id)} style={{ width: '90%' }} />
                      <BsTrash style={{ marginLeft: '5px', cursor: 'pointer', fontSize: '1.5rem' }} onClick={() => deleteTask(column.id, taskList.id, task.id)} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
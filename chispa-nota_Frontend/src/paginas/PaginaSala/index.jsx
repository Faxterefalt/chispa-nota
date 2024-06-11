import WhiteBoard from "../../componentes/PizarraBlanca";
import "./index.css";
import { useState, useRef, useEffect } from "react";
import Chat from "../../componentes/ChatBar/index";
import Swal from 'sweetalert2';

function RoomPage({ user, socket, users }) {
  const [userList, setUsers] = useState([]);
  const [userActions, setUserActions] = useState([]);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [openedUserTab, setOpenedUserTab] = useState(false);
  const [openedChatTab, setOpenedChatTab] = useState(false);

  useEffect(() => {
    socket.on("onlineUsers", (numUsers) => {
      setOnlineUsers(numUsers);
    });

    socket.on("undo", (data) => {
      setElements(data.elements);
      setHistory(data.history);
    });

    socket.on("redo", (data) => {
      setElements(data.elements);
      setHistory(data.history);
    });

    return () => {
      socket.off("onlineUsers");
      socket.off("undo");
      socket.off("redo");
    };
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("clearCanvas", () => {
        handleClearCanvas();
      });
    }
  }, [socket]);

  const logUserAction = (action) => {
    const timestamp = new Date().toLocaleTimeString();
    const image = captureCanvasImage();
    setUserActions(prevActions => [
      ...prevActions,
      { user: user.name, action, time: timestamp, image }
    ]);
  };

  const captureCanvasImage = () => {
    const canvas = canvasRef.current;
    return canvas ? canvas.toDataURL() : null;
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL();
      localStorage.setItem('canvasImage', image);
    }
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setElements([]);
    logUserAction("limpió el canvas");
  };

  const deshacer = () => {
    const newHistory = [...history, elements[elements.length - 1]];
    const newElements = elements.slice(0, elements.length - 1);
    
    setHistory(newHistory);
    setElements(newElements);

    logUserAction("deshizo una acción");
    socket.emit("undo", { elements: newElements, history: newHistory });
  };

  const rehacer = () => {
    const newElements = [...elements, history[history.length - 1]];
    const newHistory = history.slice(0, history.length - 1);

    setElements(newElements);
    setHistory(newHistory);

    logUserAction("rehizo una acción");
    socket.emit("redo", { elements: newElements, history: newHistory });
  };

  useEffect(() => {
    userActions.forEach((action, index) => {
      const miniCanvas = document.getElementById(`mini-canvas-${index}`);
      if (miniCanvas && action.image) {
        const ctx = miniCanvas.getContext("2d");
        const img = new Image();
        img.src = action.image;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, miniCanvas.width, miniCanvas.height);
        };
      }
    });
  }, [userActions]);

  return (
    <div className="row">
      <button 
        type="button" 
        className="btn btn-dark"
        style={{
          display: "block",
          position: "absolute",
          top: "5%",
          left: "3%", 
          height: "40px",
          width: "100px"
        }}
        onClick={() => setOpenedUserTab(true)}
      >
        Usuarios
      </button>

      <button 
        type="button" 
        className="btn btn-primary"
        style={{
          display: "block",
          position: "absolute",
          top: "5%",
          left: "10%", 
          height: "40px",
          width: "100px"
        }}
        onClick={() => setOpenedChatTab(true)}
      >
        Chat
      </button>

      {openedUserTab && (
        <div className="position-fixed top-0 h-100 text-white bg-dark" 
          style={{ width: "250px", left: "0%" }}
        > 
          <button 
            type="button" 
            onClick={() => setOpenedUserTab(false)}
            className="btn btn-light btn-block w-100 mt-5"
          >
            Cerrar
          </button>
          <div className="w-100 mt-5 pt-5">
            {users.map((usr, index) => (
              <p key={index * 999} className="my-2 text-center w-100">
                {usr.name}{user && user?.userId === usr.userId && " (Tú)"}
              </p>
            ))}
            <div className="mt-5 pt-3">
              <h5>Timeline de Acciones</h5>
              {userActions.map((action, index) => (
                <div key={index} className="mb-3">
                  <p className="m-0">{action.user} {action.action} a las {action.time}</p>
                  <canvas id={`mini-canvas-${index}`} width="200" height="100"></canvas>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {openedChatTab && (
        <Chat setOpenedChatTab={setOpenedChatTab} socket={socket}/>
      )}

      <h1 className='text-center py-5'>
        Pizarra Compartida
        <span className="text-primary"> [Usuarios en línea : {users.length}]</span>
      </h1>

      <div className="col-md-10 mx-auto px-5 mt-4 mb-5 d-flex align-items-center justify-content-center">
        <div className="d-flex col-md-4 justify-content-between gap-1">
          <div className="d-flex gap-1 align-items-center">
            <label htmlFor="pencil">Lápiz</label>
            <input 
              type="radio" 
              name="tool" 
              id="pencil"
              checked={tool === "pencil"}
              value="pencil" 
              className="mt-1"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>          

          <div className="d-flex gap-1 align-items-center">
            <label htmlFor="line">Línea</label>
            <input 
              type="radio" 
              name="tool" 
              id="line"
              checked={tool === "line"}
              value="line" 
              className="mt-1"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>

          <div className="d-flex gap-1 align-items-center">
            <label htmlFor="rect">Rectángulo</label>
            <input 
              type="radio" 
              name="tool" 
              id="rect"
              checked={tool === "rect"}
              value="rect" 
              className="mt-1"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-2 mx-auto">
          <div className="d-flex align-items-center">
            <label htmlFor="color">Selecciona un Color: </label>
            <input 
              type="color" 
              id="color" 
              className="mt-1 ms-2"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3 d-flex gap-2">
          <button 
            className="btn btn-primary mt-1"
            disabled={elements.length === 0}
            onClick={() => deshacer()}
          >
            Deshacer
          </button>
          <button 
            className="btn btn-outline-primary mt-1"
            disabled={history.length < 1}
            onClick={() => rehacer()}
          >
            Rehacer
          </button>
        </div>
        <div className="col-md-2">
          <button 
            className="btn btn-danger" 
            onClick={() => {
              handleClearCanvas();
              socket.emit("clearCanvas"); 
            }}
          >
            Limpiar Canvas
          </button>
        </div>
        <button 
          className="btn ml-2" 
          style={{backgroundColor: 'purple', color: 'white'}}
          onClick={() => {
            Swal.fire({
              title: '¿Quieres exportar la imagen a tu espacio de trabajo?',
              showDenyButton: true,
              confirmButtonText: `Exportar`,
              denyButtonText: `Seguir Editando`,
            }).then((result) => {
              if (result.isConfirmed) {
                handleExport();
                window.location.href = '/mainpage';
              }
            })
          }}
        >
          Mover a Principal
        </button>
      </div>

      <div className="col-md-10 mx-auto mt-1 canvas-box">
        <WhiteBoard 
          canvasRef={canvasRef} 
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          color={color}
          tool={tool}
          user={user}
          socket={socket}
        />
      </div>
    </div>
  );
}

export default RoomPage;

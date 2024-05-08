import WhiteBoard from "../../componentes/PizarraBlanca";
import "./index.css";
import {useState, useRef, useEffect} from "react";

function RoomPage({ user, socket,users}) {
  const [userList, setUsers]=useState([]);

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
  
    const [tool, setTool]=useState("pencil");
    const [color, setColor]=useState("black");
    const [elements, setElements]=useState([]);
    const [history, setHistory]=useState([]);
    const [openedUserTab, setOpenedUserTab]=useState(false);
    

    useEffect(() => {
      socket.on("userLeft", (updatedUsers) => {
          // Actualiza la lista de usuarios en línea con los usuarios actualizados
          console.log("Users left:",updatedUsers);
          setUsers(updatedUsers);
      });
  
      // Limpia el evento cuando el componente se desmonta
      return () => {
          socket.off("userLeft");
      };
  }, []);

    const handleClearCanvas=()=>{
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.fillRectangle="white";
      ctx.clearRect(
        0, 
        0, 
        canvas.width, 
        canvas.height);
  
  
      setElements([]);
    };
  
    const deshacer=()=>{
      setHistory((prevHistory)=>[
        ...prevHistory, 
        elements[elements.length-1],
      ]);
      setElements(
        (prevElements)=>prevElements.slice(0, prevElements.length-1)
      )
  
    }
  
    const rehacer=()=>{
      setElements((prevElements)=>[
        ...prevElements,
        history[history.length-1]
      ]);
      setHistory((prevHistory)=>prevHistory.slice(0, prevHistory.length-1));
    }
  
    return (
    <div className="row">
      <button 
        type="button" 
        className="btn btn-dark"
        style={{
          display:"block",
          position:"absolute",
          top:"0",left:"0", 
          height:"40px",
          width:"100px"
        }}
        onClick={()=>setOpenedUserTab(true)}
        >
          Usuarios
      </button>
      {
        openedUserTab&&(
          <div className="position-fixed top-0  h-100 text-white bg-dark" 
            style={{
              width:"250px",
              left:"0%"
              }}> 
              <button 
                type="button" 
                onClick={()=>setOpenedUserTab(false)}
                className="btn btn-light btn-block w-100 mt-5">
                Cerrar
              </button>
              
                <div className="w-100 mt-5 pt-5">
                {users.map((usr,index)=>(
                  <p key={index*999} className="my-2 text-center w-100">
                    {usr.name}{user && user?.userId === usr.userId && " (Tú)"}
                    </p>
                ))}
              
              </div>
          </div>
        )
      }
      <h1 className='text-center py-5'>
        Pizarra Compartida
        <span className="text-primary"> [Usuarios en línea : {users.length}]</span>
        </h1>
        {
          user?.presenter &&(
            <div className="col-md-10 mx-auto px-5 mt-4 mb-5 d-flex align-items-center justify-content-center">
        <div className="d-flex col-md-4 justify-content-between gap-1">
          <div className="d-flex gap-1 align-items-center">
            <label htmlfor="pencil">Lápiz</label>
            <input 
            type="radio" 
            name="tool" 
            id="pencil"
            checked ={tool === "pencil"}
            value="pencil" 
            className="mt-1"
            onChange={(e)=>setTool(e.target.value)}
            />
          </div>          
  
          <div className="d-flex gap-1 align-items-center">
          <label htmlfor="line">Línea</label>
          <input 
            type="radio" 
            name="tool" 
            id="line"
            checked ={tool === "line"}
            value="line" 
            className="mt-1"
            onChange={(e)=>setTool(e.target.value)}
          />
          </div>
  
          <div className="d-flex gap-1 align-items-center">
          <label htmlfor="rect">Rectángulo</label>
          <input 
            type="radio" 
            name="tool" 
            id="rect"
            checked ={tool === "rect"}
            value="rect" 
            className="mt-1"
            onChange={(e)=>setTool(e.target.value)}
          />
          </div>
        </div>
        <div className="col-md-2 mx-auto">
          <div className="d-flex align-items-center">
            <label htmlFor="color">Selecciona un Color: </label>
            <input 
            type="color" 
            id="color" 
            className="mt-1 ms-3"
            value={color}
            onChange={(e)=>setColor(e.target.value)}
            />
  
          </div>
        </div>
          <div className="col-md-3 d-flex gap-2">
            <button className="btn btn-primary mt-1"
            disabled={elements.length === 0}
            onClick={()=> deshacer()}
  
            >Deshacer</button>
            <button className="btn btn-outline-primary mt-1"
            disabled={history.length < 1}
            onClick={()=>rehacer()}
            >
              Rehacer</button>
          </div>
  <div className="col-md-2">
    <button className="btn btn-danger" onClick={handleClearCanvas}>Limpiar Canvas</button>
  </div>
  
            </div>
          )
        }
  
  
      <div className="col-md-10 mx-auto mt-4 canvas-box">
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
    )
  }
  
  export default RoomPage;
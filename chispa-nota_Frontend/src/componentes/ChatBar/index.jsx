function Chat({setOpenedChatTab}) {
  return (
    <div 
    className="position-fixed top-0  h-100 text-white bg-dark" 
    style={{
      width:"400px",
      left:"0%"
      }}> 

      <button 
        type="button" 
        onClick={()=>setOpenedChatTab(false)}
        className="btn btn-light btn-block w-100 mt-5">
        Cerrar
      </button>
      
        <div className="w-100 mt-5 p-2  border  border-5 border-white rounded-3 "
        style={{height:"70%"}}>

        Mensajes
      </div>
      <div className="w-100 mt-3 p-2  border d-flex border-5 border-white rounded-3 ">
      <input type="text" 
      className="h-100 border-0 rounded-0 text-white py-2 px-4" 
      placeholder="Escribe un mensaje"
      style={{"background-color":"transparent",
        width:"90%",
      }}
      />
      <button type="button" className="btn btn-primary rounded-0">
        Enviar
      </button>
      
      </div>
  </div>
  );
};

export default Chat;
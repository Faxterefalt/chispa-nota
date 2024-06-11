import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({ uuid, socket, setUser, username }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRoomJoin = (e) => {
    e.preventDefault();
    const roomData = {
      name: username, // Utiliza el username pasado como prop
      roomId,
      userId: uuid(),
      host: false,
      presenter: false
    };
    setUser(roomData);
    navigate(`/pizarra/${roomId}`);
    console.log(roomData);
    socket.emit("userJoined", roomData);
  };

  return (
    <form className='form col-md-12 mt-5'>
      <div className="form-group">
        {/* Label con estilo similar al input anterior */}
        <label className="form-control my-2 border">{username}</label>
      </div>
      <div className="form-group">
        <input 
          type="text" 
          className="form-control my-2"  
          placeholder="Ingresar código de sala"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <button 
        type="submit" 
        onClick={handleRoomJoin}
        className="btn btn-primary btn-block form-control"
      >
        Unirse a Sala
      </button>
    </form>
  );
};

export default JoinRoomForm;

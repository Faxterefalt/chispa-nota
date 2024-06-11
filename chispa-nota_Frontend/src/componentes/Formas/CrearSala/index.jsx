import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const CreateRoomForm = ({ uuid, socket, setUser, username }) => {
  const [roomId, setRoomId] = useState(uuid());
  const navigate = useNavigate();
  const handleCreateRoom = (e) => {
    e.preventDefault();

    const roomData = {
      name: username, // Utiliza el username pasado como prop
      roomId,
      userId: uuid(),
      host: true,
      presenter: true
    };

    setUser(roomData);
    navigate(`/pizarra/${roomId}`);
    console.log(roomData);
    socket.emit("userJoined", roomData);
  };

  const handleCopy = async (e) => {
    e.preventDefault();
    await navigator.clipboard.writeText(roomId);
    alert("Código de sala copiado al portapapeles");
  };

  return (
    <form className='form col-md-12 mt-5'>
      <div className="form-group">
        {/* Label con estilo similar al input anterior */}
        <label className="form-control my-2 border">{username}</label>
      </div>
      <div className="form-group border">
        <div className="input-group d-flex align-items-center justify-content-center">
          <input
            type="text"
            value={roomId}
            className="form-control my-2 border-0"
            disabled
            placeholder="Generar código de sala"
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary btn-sm me-1"
              onClick={() => setRoomId(uuid())}
              type="button"
            >
              Generar
            </button>
            <button
              className="btn btn-outline-danger btn-sm me-2"
              type="button"
              onClick={handleCopy}
            >
              Copiar
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        onClick={handleCreateRoom}
        className="btn btn-primary btn-block form-control"
      >
        Generar Sala
      </button>
    </form>
  );
};

export default CreateRoomForm;

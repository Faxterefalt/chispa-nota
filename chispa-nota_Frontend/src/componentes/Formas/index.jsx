import CreateRoomForm from "./CrearSala";
import JoinRoomForm from "./UnirseSala";
import "./index.css";
const Forms = ({uuid, socket, setUser}) =>{
  return(
    <div className="row h-100 pt-5">
          <div className="col-md-4 mt-5 form-box p-5 border  border-primary rounded-2 mx-auto d-flex flex-column align-items-center justify ">
            <h1 className="text-primary fw-bold">Crear Sala</h1>
            <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
          </div>
          <div className="col-md-4 mt-5 form-box p-5 border  border-primary rounded-2 mx-auto d-flex flex-column align-items-center justify ">
            <h1 className="text-primary fw-bold">Unirse a Sala</h1>
            <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} />
          </div>
        </div>
  );

};

export default Forms;
import React, { useState, useEffect } from 'react';
import CreateRoomForm from "./CrearSala";
import JoinRoomForm from "./UnirseSala";
import "./index.css";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Forms = ({ uuid, socket, setUser }) => {
  const location = useLocation();
  const accountId = new URLSearchParams(location.search).get('accountId');
  const [username, setUsername] = useState('');
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cuentas/${accountId}`);
        setUsername(response.data.user);
      } catch (error) {
        console.error('Error al obtener el nombre de usuario:', error);
      }
    };

    fetchUsername();

  }, [accountId]);
  
  
  return (
    <div className="row h-100 pt-5">
      <div className="col-md-4 mt-5 form-box p-5 border border-primary rounded-2 mx-auto d-flex flex-column align-items-center justify">
        <h1 className="text-primary fw-bold">Crear Sala</h1>

        <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} accountId={accountId}  username={username} />
      </div>
      <div className="col-md-4 mt-5 form-box p-5 border border-primary rounded-2 mx-auto d-flex flex-column align-items-center justify">
        <h1 className="text-primary fw-bold">Unirse a Sala</h1>
        <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} accountId={accountId}  username={username}/>
      </div>
    </div>
  );
};

export default Forms;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Forms from './componentes/Formas';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import RoomPage from './paginas/PaginaSala';
import Login from "./componentes/Login";
import HomePage from "./componentes/HomePage";
import SignUp from "./componentes/SignUp";
import MainPage from "./componentes/MainPage";
import Tareas from "./componentes/notas-tareas/Tareas";
import {toast, ToastContainer} from 'react-toastify';

const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection": true,
  "reconnectionAttempts": "Infinity",
  "timeout": 10000,
  "transports": ["websocket"]
};

const socket = io(server, connectionOptions);

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if (data.success) {
        console.log("Usuario se ha unido a la sala.");
        setUsers(data.users);
      } else {
        console.log("Error al unirse a la sala.");
      }
    });

    socket.on("allUsers",(data)=>{
      setUsers(data);
    });

    const handleUserJoined = (data) => {
      toast.info(`${data} se ha unido a la sala.`);
    };

    socket.on("userJoinedMessageBroadcasted", handleUserJoined);

    return () => {
      socket.off("userJoinedMessageBroadcasted", handleUserJoined);
    };

    socket.on("userLeftMessageBroadcasted",(data)=>{
      console.log(`${data} ha abandonado a la sala.`);
    });
  },[]);

  const uuid = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
    );
  }

  return (
    <Router>
      <div className='container'>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/tareas" element={<Tareas />} />
          <Route
            path="/pizarra"
            element={
              <Forms
                uuid={uuid}
                socket={socket}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/pizarra/:roomId"
            element={
              <RoomPage
                user={user}
                socket={socket}
                users={users}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

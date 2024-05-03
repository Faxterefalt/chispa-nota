import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import HomePage from "./componentes/HomePage";
import SignUp from "./componentes/SignUp";
import MainPage from "./componentes/MainPage";
import Tareas from "./componentes/notas-tareas/Tareas";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/tareas" element = {<Tareas/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
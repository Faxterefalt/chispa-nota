import React from 'react';
import ReactDOM from 'react-dom'; // Cambia esta línea
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

//estilo general de la página
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
//notificaciones de usuario
import "react-toastify/dist/ReactToastify.css";  


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>
);

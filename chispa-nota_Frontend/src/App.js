import React from 'react';
import './App.css'; // Importa los estilos CSS para la aplicación
import MainLayout from './componentes/MainLayout'; // Importa el componente MainLayout

function App() {
  return (
    <div className="app">
      {/* Renderiza el componente MainLayout */}
      <MainLayout />
    </div>
  );
}

export default App;
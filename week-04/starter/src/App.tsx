import React from 'react';
import { Catalog } from './components/Catalog';
import './App.css';

/**
 * QUÉ: Componente raíz de la aplicación.
 * PARA: Actuar como el contenedor principal que monta el catálogo de servicios de traducción.
 * IMPACTO: Inicializa la interfaz de usuario y establece la estructura base del DOM para React.
 */
const App: React.FC = () => {
  return (
    <div className="app">
      {/* El componente Catalog orquesta toda la lógica de 
          búsqueda, filtrado y ordenamiento del dominio.
      */}
      <Catalog />
    </div>
  );
};

export default App;
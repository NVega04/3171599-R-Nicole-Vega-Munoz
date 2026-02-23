import React from 'react';
import { Dashboard } from './components/Dashboard';

/**
 * COMPONENTE: App
 * QUE: Nodo raíz de la aplicación de Servicios de Traducción.
 * PARA QUÉ: Centralizar el layout global y los estilos base del sistema.
 * IMPACTO: Asegura que el Dashboard se renderice correctamente y permite escalar
 * añadiendo navegación o contextos globales en el futuro.
 */
function App() {
  return (
    <div className="app-container">
      {/* Este contenedor permite aplicar estilos globales como fondos 
          o fuentes sin ensuciar el componente Dashboard.
      */}
      <Dashboard />
    </div>
  );
}

export default App;
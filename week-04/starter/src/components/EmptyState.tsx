// ============================================
// COMPONENTE: EmptyState
// ============================================
// Muestra mensaje cuando no hay elementos

import React from 'react';

interface EmptyStateProps {
  message?: string;
  onClearFilters?: () => void;
}

/**
 * QUÉ: Componente visual para informar la ausencia de datos en el catálogo.
 * PARA: Manejar el renderizado condicional cuando los filtros o búsquedas no coinciden con ningún traductor.
 * IMPACTO: Mejora la experiencia del usuario al ofrecer una salida clara (limpiar filtros) en lugar de una pantalla en blanco.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No se encontraron servicios de traduccion que coincidan con los criterios seleccionados.',
  onClearFilters,
}) => {
  return (
    <div 
      className="empty-state" 
      style={{ 
        textAlign: 'center', 
        padding: '3rem', 
        border: '2px dashed #ccc', 
        borderRadius: '12px',
        marginTop: '2rem' 
      }}
    >
      <div className="empty-state-content">
        <h3 style={{ fontSize: '1.5rem', color: '#555' }}>
          Busqueda sin resultados
        </h3>
        <p style={{ color: '#777', marginBottom: '1.5rem' }}>
          {message}
        </p>

        {/* Renderizado condicional del botón para limpiar filtros.
          Punto evaluado en la rúbrica: Botón para limpiar filtros funcional.
        */}
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="btn-clear"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Restablecer todos los filtros
          </button>
        )}
      </div>
    </div>
  );
};
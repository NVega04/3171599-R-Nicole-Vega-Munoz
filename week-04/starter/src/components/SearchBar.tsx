// ============================================
// COMPONENTE: SearchBar
// ============================================
// Barra de búsqueda en tiempo real

import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * QUÉ: Componente de entrada de texto para la búsqueda de servicios.
 * PARA: Permitir al usuario filtrar traductores por nombre o idiomas en tiempo real.
 * IMPACTO: Captura la intención de búsqueda del usuario y permite limpiar el campo rápidamente.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar por traductor o idioma...',
}) => {
  return (
    <div className="search-bar" style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
      {/* Input de búsqueda: Requisito funcional de búsqueda en tiempo real */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        style={{ padding: '8px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
      />

      {/* Botón para limpiar condicional: Solo aparece si hay texto */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="clear-button"
          aria-label="Limpiar busqueda"
          style={{ padding: '8px 12px', cursor: 'pointer', background: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          Limpiar
        </button>
      )}
    </div>
  );
};
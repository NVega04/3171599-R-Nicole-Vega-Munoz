// ============================================
// COMPONENTE: SortSelector
// ============================================
// Selector de criterio de ordenamiento

import React from 'react';
import { SortOption } from '../types';
import { sortOptions } from '../data/service';

interface SortSelectorProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

/**
 * QUÉ: Componente de selección para cambiar el criterio de ordenamiento de la lista.
 * PARA: Permitir al usuario organizar los servicios por nombre, tarifa o calificación.
 * IMPACTO: Proporciona la entrada necesaria para que la lógica de ordenamiento en el catálogo reorganice los datos sin mutarlos.
 */
export const SortSelector: React.FC<SortSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="sort-selector" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* Etiqueta del selector para accesibilidad */}
      <label htmlFor="sort-select" style={{ fontWeight: 'bold' }}>
        Ordenar por:
      </label>

      {/* Selector de ordenamiento: Requisito funcional de al menos 3 opciones */}
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
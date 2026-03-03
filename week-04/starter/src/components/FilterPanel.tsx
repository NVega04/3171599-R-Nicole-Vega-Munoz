// ============================================
// COMPONENTE: FilterPanel
// ============================================
// Panel con todos los filtros

import React from 'react';
import { CategoryFilter } from '../types';
import { categories } from '../data/service';

interface FilterPanelProps {
  selectedCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  showOnlyAvailable: boolean;
  onAvailableChange: (value: boolean) => void;
  onClearFilters: () => void;
}

/**
 * QUÉ: Componente que agrupa los controles de filtrado por especialidad y disponibilidad.
 * PARA: Permitir al usuario segmentar el catálogo de traductores según sus necesidades específicas.
 * IMPACTO: Mejora la usabilidad y cumple con el requisito funcional de implementar al menos dos filtros distintos.
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategory,
  onCategoryChange,
  showOnlyAvailable,
  onAvailableChange,
  onClearFilters,
}) => {
  return (
    <div className="filter-panel" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
      
      {/* Selector de especialidad: Adaptación al dominio (Legal, Médica, etc.) */}
      <div className="filter-group">
        <label htmlFor="category" style={{ marginRight: '8px', fontWeight: 'bold' }}>Especialidad:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as CategoryFilter)}
          style={{ padding: '6px', borderRadius: '4px' }}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Checkbox de disponibilidad: Filtro booleano requerido por la rúbrica */}
      <div className="filter-group">
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showOnlyAvailable}
            onChange={(e) => onAvailableChange(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Mostrar solo traductores disponibles
        </label>
      </div>

      {/* Botón para limpiar filtros: Requisito funcional obligatorio */}
      <button 
        onClick={onClearFilters} 
        className="btn-clear"
        style={{ 
          padding: '6px 12px', 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Limpiar filtros
      </button>
    </div>
  );
};
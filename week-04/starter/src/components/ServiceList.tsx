// ============================================
// COMPONENTE: ItemList
// ============================================
// Renderiza la lista de elementos

import React from 'react';
import { TranslationService } from '../types';
import { ServiceCard } from './ServiceCard';
import { EmptyState } from './EmptyState';

interface ServiceListProps {
  services: TranslationService[];
  isLoading?: boolean;
  error?: string | null;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  onClearFilters?: () => void;
}

/**
 * QUÉ: Componente contenedor que gestiona la visualización de la colección de servicios.
 * PARA: Implementar la lógica de renderizado condicional (carga, error, vacío) y el mapeo de la lista.
 * IMPACTO: Asegura que el usuario siempre reciba retroalimentación visual del estado actual de los datos.
 */
export const ServiceList: React.FC<ServiceListProps> = ({
  services,
  isLoading = false,
  error = null,
  onDelete,
  onView,
  onClearFilters,
}) => {
  /**
   * QUÉ: Renderizado condicional para el estado de carga.
   * PARA: Mostrar un mensaje visual mientras se obtienen o procesan los datos.
   * IMPACTO: Cumple con el requisito funcional de mostrar el estado de carga (loading).
   */
  if (isLoading) {
    return (
      <div className="loading-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Cargando catalogo de servicios de traduccion...</p>
      </div>
    );
  }

  /**
   * QUÉ: Renderizado condicional para el manejo de errores.
   * PARA: Informar al usuario si ocurrió un problema técnico durante la ejecución.
   * IMPACTO: Evita que la aplicación se rompa silenciosamente y mejora la experiencia del usuario.
   */
  if (error) {
    return (
      <div className="error-container" style={{ color: 'red', padding: '1rem', border: '1px solid red' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  /**
   * QUÉ: Renderizado condicional para el estado vacío.
   * PARA: Mostrar un componente alternativo cuando el filtrado o la búsqueda no arrojan resultados.
   * IMPACTO: Cumple con el requisito de estado vacío y permite al usuario limpiar los filtros.
   */
  if (services.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  /**
   * QUÉ: Estructura principal de la lista de servicios.
   * PARA: Renderizar dinámicamente cada ServiceCard usando el método .map().
   * IMPACTO: Implementa la visualización del catálogo con keys únicas (ID) para optimizar el rendimiento de React.
   */
  return (
    <section className="service-list-container">
      <div className="results-counter" style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
        Resultados encontrados: {services.length}
      </div>
      
      <div 
        className="service-grid" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px' 
        }}
      >
        {services.map((service) => (
          <ServiceCard
            key={service.id} // Key única basada en el ID del dominio, no en el índice
            service={service}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
      </div>
    </section>
  );
};
// ============================================
// COMPONENTE: ServiceCard
// ============================================
// Muestra una tarjeta con la información de un elemento
// TODO: Adaptar a tu dominio

import React from 'react';
import { TranslationService } from '../types';

interface ServiceCardProps {
  service: TranslationService;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

/**
 * QUÉ: Componente funcional que representa la unidad visual mínima de un servicio de traducción.
 * PARA: Visualizar de forma organizada los datos de un traductor, su especialidad y tarifas.
 * IMPACTO: Facilita la interacción del usuario mediante renderizado condicional de estados y botones de acción.
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onDelete,
  onView,
}) => {
  /**
   * QUÉ: Formateador de moneda para las tarifas.
   * PARA: Mostrar el precio por palabra en un formato legible para el usuario.
   * IMPACTO: Mejora la presentación visual y coherencia del dominio financiero.
   */
  const formattedRate = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COL',
    minimumFractionDigits: 2,
  }).format(service.ratePerWord);

  return (
    <div className="service-card" style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
      {/* 1. Nombre del traductor */}
      <h3 className="translator-name">{service.translatorName}</h3>
      
      <p className="languages">
        <strong>Par de idiomas:</strong> {service.sourceLanguage} a {service.targetLanguage}
      </p>

      {/* 2. Categoría/Especialidad con badge */}
      <div className={`badge specialty-${service.specialty.toLowerCase()}`}>
        Especialidad: {service.specialty}
      </div>

      {/* 3. Precio formateado */}
      <p className="rate">
        <strong>Tarifa:</strong> {formattedRate} por palabra
      </p>

      {/* 4. Rating con estrellas (Texto) */}
      <p className="rating">
        Calificación: {service.rating} / 5.0
      </p>

      {/* 5. Estado de disponibilidad - Renderizado condicional */}
      <div className="availability-status">
        {service.isAvailable ? (
          <span className="status available" style={{ color: 'green' }}>
            Estado: Disponible para nuevos proyectos
          </span>
        ) : (
          <span className="status unavailable" style={{ color: 'red' }}>
            Estado: No disponible actualmente
          </span>
        )}
      </div>

      <p className="experience">Experiencia: {service.experienceYears} años</p>

      {/* 6. Botones de acción */}
      <div className="actions" style={{ marginTop: '1rem', display: 'flex', gap: '10px' }}>
        {onView && (
          <button 
            className="btn-view" 
            onClick={() => onView(service.id)}
          >
            Ver perfil completo
          </button>
        )}
        {onDelete && (
          <button 
            className="btn-delete" 
            onClick={() => onDelete(service.id)}
            style={{ backgroundColor: '#ab9d9d', color: 'white' }}
          >
            Eliminar del catalogo
          </button>
        )}
      </div>
    </div>
  );
};
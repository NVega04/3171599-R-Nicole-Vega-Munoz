import React, { useState, useEffect } from 'react';
import type { Service } from '../types';
import { fetchItems } from '../utils/api';
import './ServiceList.css';

export const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadServices = async () => {
      try {
        setLoading(true);
        // IMPORTANTE: No limpiar el error aquí si quieres evitar parpadeos bruscos
        const data = await fetchItems(controller.signal);
        setServices(data);
        setError(null);
      } catch (err: any) {
        // REGLA DE ORO: Si es AbortError, ignoramos el cambio de estado por completo
        if (err.name === 'AbortError' || err.message === 'Petición cancelada') {
          return; 
        }
        setError(err instanceof Error ? err.message : 'Error al conectar con el servidor');
      } finally {
        // Solo quitamos el loading si la señal no ha sido abortada
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadServices();
    return () => controller.abort();
  }, []);

  // Filtrado reactivo basado en el input
  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="service-list-status loading">
        <div className="spinner"></div>
        <p>Consultando catálogo de traducción...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="service-list-status error">
        <h2>Error de conexión</h2>
        <p>El sistema no pudo recuperar los servicios activos.</p>
        <button className="btn-refresh" onClick={() => window.location.reload()}>
          Reintentar conexión
        </button>
      </div>
    );
  }

  return (
    <div className="service-list-container">
      <div className="list-header">
        <div>
          <h2>Catálogo de servicios profesionales</h2>
          <p className="item-count">
            {filteredServices.length} especialidades disponibles
          </p>
        </div>
        
        {/* Buscador movido a la parte superior para mejor UX */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar por especialidad o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredServices.length === 0 ? (
        <div className="empty-state">
          <p>No se encontraron servicios que coincidan con "{searchTerm}"</p>
        </div>
      ) : (
        <div className="services-grid">
          {filteredServices.map((service) => (
            <div key={service.id} className={`service-card-item ${!service.active ? 'disabled' : ''}`}>
              <div className="card-content">
                <span className="category-badge">{service.category}</span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                
                <div className="card-footer">
                  <div className="price-info">
                    <span className="price">${service.price}</span>
                    <span className="unit">/palabra</span>
                  </div>
                  {service.durationHours && (
                    <span className="delivery-time">⏱ {service.durationHours}h</span>
                  )}
                </div>
              </div>

              <button className="btn-action" disabled={!service.active}>
                {service.active ? 'Activo' : 'No disponible'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
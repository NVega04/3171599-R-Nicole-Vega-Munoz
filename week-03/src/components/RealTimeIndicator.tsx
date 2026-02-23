import React, { useState, useEffect } from 'react';
import type { RealTimeData } from '../types';
import { fetchRealTimeData } from '../utils/api';
import './RealTimeIndicator.css';

// ============================================
// COMPONENTE: RealTimeIndicator
// QUE: Monitor de actividad en vivo (Polling) para el flujo de traducción.
// PARA QUE: Visualizar el estado actual del sistema sin intervención del usuario.
// IMPACTO: Aumenta la percepción de dinamismo y control sobre la carga de trabajo actual.
// ============================================

const POLLING_INTERVAL = 5000; // 5 segundos

export const RealTimeIndicator: React.FC = () => {
  // 1. Definir estados para la gestión de datos y feedback visual
  const [data, setData] = useState<RealTimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // 2. Implementar useEffect con setInterval para polling
  useEffect(() => {
    // 2.1. Función para cargar datos
    const loadData = async () => {
      try {
        setIsUpdating(true);
        const newData = await fetchRealTimeData();
        setData(newData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading real-time data:', err);
      } finally {
        setIsUpdating(false);
      }
    };

    // 2.2. Llamada inicial
    loadData();

    // 2.3. Configurar polling con setInterval
    const intervalId = setInterval(() => {
      console.log('Actualizando flujo de traducciones...');
      loadData();
    }, POLLING_INTERVAL);

    // 2.4. Cleanup: limpiar interval al desmontar
    return () => {
      clearInterval(intervalId);
      console.log('Traducción detenida');
    };
  }, []);

  // 3. Helper para formatear timestamp
  const formatTimestamp = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString();
  };

  // 4. Renderizado condicional para loading inicial
  if (loading) {
    return (
      <div className="realtime-indicator loading">
        <h2>Sincronizando flujo de trabajo...</h2>
      </div>
    );
  }

  if (!data) return null;

  // 5. Renderizado principal acoplado al dominio
  return (
    <div className="realtime-indicator">
      <div className="realtime-header">
        <h2>Traducciones en curso</h2>
        
        {/* Indicador de actualización activa */}
        {isUpdating && (
          <span className="updating-badge">Sincronizando...</span>
        )}
      </div>

      <div className="realtime-content">
        {/* Valor principal: Palabras o documentos siendo procesados */}
        <div className="realtime-value">
          {data.value} <span className="unit">{data.unit}</span>
        </div>

        {/* Label descriptivo: ej: "Traduciéndose en este momento" */}
        <div className="realtime-label">{data.label}</div>

        {/* Timestamp de última actualización */}
        <div className="realtime-timestamp">
          Última actualización: {formatTimestamp(data.lastUpdated)}
        </div>

        {/* Estado actual del flujo */}
        <div className="realtime-status">
          Status: <strong>{data.status.toUpperCase()}</strong>
        </div>

        <div className="next-update">
          Próxima actualización en {POLLING_INTERVAL / 1000} segundos
        </div>
      </div>

      {/* Barra de progreso visual hasta próxima actualización */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          key={data.lastUpdated} // Reinicia la animación de CSS al cambiar el dato
          style={{ animation: `progress ${POLLING_INTERVAL}ms linear infinite` }}
        ></div>
      </div>
    </div>
  );
};

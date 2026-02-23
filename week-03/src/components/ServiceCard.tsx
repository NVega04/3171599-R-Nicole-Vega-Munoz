import React, { useState, useEffect } from 'react';
import type { Stats } from '../types';
import { fetchStats } from '../utils/api';
import './ServiceCard.css';

// ============================================
// QUE: Panel de indicadores clave de rendimiento (KPIs).
// PARA QUE: Visualizar el volumen y estado del flujo de traducción.
// IMPACTO: Permite la toma de decisiones basada en datos en tiempo real.
// ============================================

export const ServiceCard: React.FC = () => {
  // 1. Estados independientes para cada métrica
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [activeProjects, setActiveProjects] = useState<number>(0);
  const [wordsTranslated, setWordsTranslated] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. Efecto unificado para cargar las estadísticas iniciales
  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        setLoading(true);
        const data: Stats = await fetchStats();
        
        // Seteamos los estados de forma independiente
        setTotalProjects(data.totalProjects);
        setActiveProjects(data.activeProjects);
        setWordsTranslated(data.wordsTranslated);
      } catch (err) {
        console.error('Error cargando KPIs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardStats();
  }, []);

  // 3. Renderizado de estado de carga
  if (loading) {
    return (
      <div className="stats-card loading">
        <p>Calculando métricas de rendimiento...</p>
      </div>
    );
  }

  // 4. Renderizado principal: Dashboard de Traducción
  return (
    <div className="stats-card">
      <div className="stats-header">
        <h2>Panel de operaciones</h2>
        <span className="live-indicator">En vivo</span>
      </div>

      <div className="stats-grid">
        {/* Stat 1 - Volumen Histórico */}
        <div className="stat">
          <div className="stat-value">{totalProjects.toLocaleString()}</div>
          <div className="stat-label">Pedidos realizados</div>
          <div className="stat-trend">↑ 12% este mes</div>
        </div>

        {/* Stat 2 - Carga de Trabajo Actual */}
        <div className="stat">
          <div className="stat-value">{activeProjects}</div>
          <div className="stat-label">Traducciones en curso</div>
          <div className="stat-progress-bar">
            <div className="progress" style={{ width: `${(activeProjects / totalProjects) * 100}%` }}></div>
          </div>
        </div>

        {/* Stat 3 - Volumen de Palabras (KPI Rey) */}
        <div className="stat highlight">
          <div className="stat-value">
            {(wordsTranslated / 1000).toFixed(1)}k
          </div>
          <div className="stat-label">Palabras procesadas</div>
          <small>Unidad: Miles de palabras</small>
        </div>

        {/* Stat 4 - Métrica Calculada: Eficiencia */}
        <div className="stat">
          <div className="stat-value">
            {totalProjects > 0 ? ((activeProjects / totalProjects) * 100).toFixed(0) : 0}%
          </div>
          <div className="stat-label">Capacidad utilizada</div>
        </div>
      </div>
    </div>
  );
};

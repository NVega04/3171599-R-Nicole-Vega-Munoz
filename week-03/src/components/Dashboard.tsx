import React from 'react';
import { ServiceList } from './ServiceList';
import { ServiceCard as StatsCard } from './ServiceCard'; // Lo renombramos para claridad
import { RealTimeIndicator } from './RealTimeIndicator';
import './Dashboard.css';

// ============================================
// COMPONENTE: Dashboard (Principal)
// QUE: Centro de operaciones de la plataforma de traducción.
// PARA QUE: Orquestar la vista de KPIs, monitoreo en vivo y catálogo.
// IMPACTO: Centraliza el flujo de trabajo del administrador en una sola vista.
// ============================================

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      {/* Header personalizado del dominio de traducción */}
      <header className="dashboard-header">
        <div className="header-info">
          <h1>Panel de control - Gestión de traducciones</h1>
          <p className="subtitle">Monitoreo servicios y rendimiento</p>
        </div>

        <div className="header-controls">
          <button className="btn-refresh" onClick={() => window.location.reload()}>
            Sincronizar sistema
          </button>
        </div>
      </header>

      {/* Layout principal con componentes acoplados */}
      <main className="dashboard-main">
        
        <div className="dashboard-top-grid">
          {/* Sección de estadísticas globales (KPIs) */}
          <section className="dashboard-section stats-area">
            <StatsCard />
          </section>

          {/* Sección de monitorización en tiempo real */}
          <section className="dashboard-section realtime-area">
            <RealTimeIndicator />
          </section>
        </div>

        {/* Sección de catálogo y gestión de servicios */}
        <section className="dashboard-section dashboard-list">
          <header className="section-header">
            <h3>Administración de catálogo profesional</h3>
          </header>
          <ServiceList />
        </section>
      </main>

      {/* Footer corporativo */}
      <footer className="dashboard-footer">
        <p>Servicios de traducción profesionales &copy; {new Date().getFullYear()} - Semana 3: Nicole Vega</p>
      </footer>
    </div>
  );
};

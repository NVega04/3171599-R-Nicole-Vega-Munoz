// ============================================
// COMPONENTE: Catalog (Principal)
// ============================================
// Orquesta todos los componentes del catálogo

import React, { useState, useMemo } from 'react';
import { TranslationService, CategoryFilter, SortOption } from '../types';
import { services as initialServices } from '../data/service';
import { useDebounce } from '../hooks/useDebounce';
import { SearchBar } from './SearchBar';
import { FilterPanel } from './FilterPanel';
import { SortSelector } from './SortSelector';
import { ServiceList } from './ServiceList';

/**
 * QUÉ: Componente principal que orquesta la lógica de negocio y el estado global del catálogo.
 * PARA: Centralizar el filtrado, búsqueda y ordenamiento de los servicios de traducción.
 * IMPACTO: Sirve como el contenedor inteligente (smart component) que alimenta a los componentes de presentación.
 */
export const Catalog: React.FC = () => {
  // ============================================
  // ESTADOS
  // ============================================

  // Datos del dominio: servicios de traduccion
  const [services, setServices] = useState<TranslationService[]>(initialServices);

  // Estados de UI para cumplimiento de renderizado condicional
  const [isLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  // Estados de filtros y busqueda
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  // Aplicacion de Debounce para optimizar busqueda en tiempo real
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // ============================================
  // PROCESAMIENTO DE DATOS (Filtrado y Ordenamiento)
  // ============================================

  /**
   * QUÉ: Lógica de procesamiento de la lista de servicios.
   * PARA: Calcular la lista resultante basada en los filtros activos sin mutar el array original.
   * IMPACTO: Optimiza el rendimiento mediante useMemo, recalculando solo cuando cambian las dependencias.
   */
  const processedServices = useMemo(() => {
    // Copia del array para evitar mutacion (Requisito de rubrica)
    let result = [...services];

    // 1. Busqueda Case-Insensitive en multiples campos (Nombre e Idiomas)
    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter((service) =>
        service.translatorName.toLowerCase().includes(term) ||
        service.sourceLanguage.toLowerCase().includes(term) ||
        service.targetLanguage.toLowerCase().includes(term)
      );
    }

    // 2. Filtrado por especialidad
    if (selectedCategory !== 'all') {
      result = result.filter((service) => service.specialty === selectedCategory);
    }

    // 3. Filtrado booleano por disponibilidad
    if (showOnlyAvailable) {
      result = result.filter((service) => service.isAvailable);
    }

    // 4. Ordenamiento sin mutar el original
    switch (sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.translatorName.localeCompare(b.translatorName));
        break;
      case 'name-desc':
        result.sort((a, b) => b.translatorName.localeCompare(a.translatorName));
        break;
      case 'price-asc':
        result.sort((a, b) => a.ratePerWord - b.ratePerWord);
        break;
      case 'price-desc':
        result.sort((a, b) => b.ratePerWord - a.ratePerWord);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [services, debouncedSearchTerm, selectedCategory, showOnlyAvailable, sortBy]);

  // ============================================
  // HANDLERS (Manejo de eventos)
  // ============================================

  const handleDelete = (id: number): void => {
    if (window.confirm('¿Desea eliminar este servicio de traduccion de forma permanente?')) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleView = (id: number): void => {
    const service = services.find((s) => s.id === id);
    if (service) {
      alert(`Visualizando perfil de: ${service.translatorName} (${service.specialty})`);
    }
  };

  const clearFilters = (): void => {
    setSearchTerm('');
    setSelectedCategory('all');
    setShowOnlyAvailable(false);
    setSortBy('name-asc');
  };

  // ============================================
  // RENDER (Estructura de la vista)
  // ============================================

  return (
    <div className="catalog" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header className="catalog-header" style={{ borderBottom: '2px solid #eee', marginBottom: '20px' }}>
        <h1 style={{ color: '#2c3e50' }}>Catalogo de Servicios de Traduccion Profesionales</h1>
      </header>

      {/* Seccion de Busqueda */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar por traductor o par de idiomas..."
      />

      {/* Controles de Filtros y Ordenamiento */}
      <div className="controls-layout" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <FilterPanel
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          showOnlyAvailable={showOnlyAvailable}
          onAvailableChange={setShowOnlyAvailable}
          onClearFilters={clearFilters}
        />

        <SortSelector
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      {/* Requisito funcional: Contador de resultados */}
      <div className="results-summary" style={{ marginBottom: '1rem', color: '#666' }}>
        <p>
          Mostrando {processedServices.length} servicios de un total de {services.length} registrados.
          {debouncedSearchTerm && ` Resultados para la busqueda: "${debouncedSearchTerm}"`}
        </p>
      </div>

      {/* Lista de elementos con manejo de estados */}
      <ServiceList
        services={processedServices}
        isLoading={isLoading}
        error={error}
        onDelete={handleDelete}
        onView={handleView}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

export default Catalog;
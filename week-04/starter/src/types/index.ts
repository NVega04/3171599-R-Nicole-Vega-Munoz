// ============================================
// TIPOS E INTERFACES
// ============================================
// Adapta estos tipos a tu dominio asignado

/**
 * QUÉ: Definición de la interfaz principal para un servicio de traducción profesional.
 * PARA: Garantizar que cada objeto de servicio tenga las propiedades necesarias (idiomas, especialidad, tarifa) para el catálogo.
 * IMPACTO: Proporciona tipado estricto en toda la aplicación, evitando errores de compilación.
 */
export interface TranslationService {
  id: number; // ID único requerido para Keys
  translatorName: string;
  sourceLanguage: string;
  targetLanguage: string;
  specialty: TranslationCategory;
  ratePerWord: number; // Precio base por palabra
  rating: number; // Puntuación del traductor
  isAvailable: boolean; // Estado de disponibilidad para renderizado condicional
  experienceYears: number;
  deliveryTimeDays: number;
  createdAt: string;
}

/**
 * QUÉ: Tipos de especialidades disponibles en el dominio de traducción.
 * PARA: Restringir las categorías a valores válidos del negocio.
 * IMPACTO: Facilita el filtrado preciso por áreas técnicas o literarias.
 */
export type TranslationCategory = 
  | 'Legal' 
  | 'Médica' 
  | 'Técnica' 
  | 'Literaria' 
  | 'Comercial';

/**
 * QUÉ: Unión de literales para las categorías de filtrado (incluye opción 'all').
 * PARA: Controlar las opciones disponibles en el componente FilterPanel.
 * IMPACTO: Permite una navegación fluida entre especialidades del catálogo.
 */
export type CategoryFilter = 'all' | TranslationCategory;

/**
 * QUÉ: Opciones permitidas para el ordenamiento de la lista.
 * PARA: Definir los criterios de clasificación (alfabético, precio, popularidad).
 * IMPACTO: Asegura que la función de ordenamiento solo reciba parámetros válidos.
 */
export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc';

/**
 * QUÉ: Interfaz que representa el estado global de los filtros aplicados.
 * PARA: Mantener sincronizados la búsqueda, los filtros de categoría y el orden en un solo lugar.
 * IMPACTO: Centraliza la lógica de filtrado en el componente Catalog para una respuesta reactiva.
 */
export interface FilterState {
  searchTerm: string; // Búsqueda case-insensitive
  category: CategoryFilter;
  showOnlyAvailable: boolean; // Filtro booleano
  sortBy: SortOption;
  minPrice?: number; // Filtro de rango de precio
  maxPrice?: number;
}

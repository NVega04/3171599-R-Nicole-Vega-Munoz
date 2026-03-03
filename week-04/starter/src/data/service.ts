// ============================================
// DATOS MOCK
// ============================================
// TODO: Adapta estos datos a tu dominio

/**
 * QUÉ: Listado de datos simulados (mock data) para los servicios de traducción.
 * PARA: Proveer una base de datos realista para el catálogo, permitiendo probar filtros y búsqueda.
 * IMPACTO: Alimenta el estado inicial de la aplicación y garantiza que el renderizado de listas sea funcional.
 */
import { TranslationService, CategoryFilter, SortOption } from '../types';

export const services: TranslationService[] = [
  {
    id: 1,
    translatorName: 'Elena Rodríguez',
    sourceLanguage: 'Inglés',
    targetLanguage: 'Español',
    specialty: 'Médica',
    ratePerWord: 250,
    rating: 4.9,
    isAvailable: true,
    experienceYears: 10,
    deliveryTimeDays: 3,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    translatorName: 'Jean Luc Picard',
    sourceLanguage: 'Francés',
    targetLanguage: 'Español',
    specialty: 'Legal',
    ratePerWord: 450,
    rating: 4.8,
    isAvailable: true,
    experienceYears: 15,
    deliveryTimeDays: 5,
    createdAt: '2024-02-20',
  },
  {
    id: 3,
    translatorName: 'Hans Müller',
    sourceLanguage: 'Alemán',
    targetLanguage: 'Inglés',
    specialty: 'Técnica',
    ratePerWord: 380,
    rating: 4.7,
    isAvailable: false,
    experienceYears: 8,
    deliveryTimeDays: 4,
    createdAt: '2024-01-10',
  },
  {
    id: 4,
    translatorName: 'Yuki Tanaka',
    sourceLanguage: 'Japonés',
    targetLanguage: 'Inglés',
    specialty: 'Comercial',
    ratePerWord: 550,
    rating: 5.0,
    isAvailable: true,
    experienceYears: 12,
    deliveryTimeDays: 7,
    createdAt: '2024-03-05',
  },
  {
    id: 5,
    translatorName: 'Alessandra Rossi',
    sourceLanguage: 'Italiano',
    targetLanguage: 'Español',
    specialty: 'Literaria',
    ratePerWord: 320,
    rating: 4.6,
    isAvailable: true,
    experienceYears: 6,
    deliveryTimeDays: 6,
    createdAt: '2024-02-15',
  },
  {
    id: 6,
    translatorName: 'Michael Smith',
    sourceLanguage: 'Español',
    targetLanguage: 'Inglés',
    specialty: 'Técnica',
    ratePerWord: 280,
    rating: 4.2,
    isAvailable: false,
    experienceYears: 5,
    deliveryTimeDays: 2,
    createdAt: '2024-01-25',
  },
  {
    id: 7,
    translatorName: 'Svetlana Volkov',
    sourceLanguage: 'Ruso',
    targetLanguage: 'Español',
    specialty: 'Legal',
    ratePerWord: 480,
    rating: 4.5,
    isAvailable: true,
    experienceYears: 9,
    deliveryTimeDays: 8,
    createdAt: '2024-03-10',
  },
  {
    id: 8,
    translatorName: 'Chen Wei',
    sourceLanguage: 'Chino',
    targetLanguage: 'Inglés',
    specialty: 'Comercial',
    ratePerWord: 600,
    rating: 4.9,
    isAvailable: true,
    experienceYears: 20,
    deliveryTimeDays: 10,
    createdAt: '2024-02-28',
  },
  {
    id: 9,
    translatorName: 'Marta Santos',
    sourceLanguage: 'Portugués',
    targetLanguage: 'Español',
    specialty: 'Médica',
    ratePerWord: 180,
    rating: 4.4,
    isAvailable: true,
    experienceYears: 7,
    deliveryTimeDays: 4,
    createdAt: '2024-03-01',
  },
  {
    id: 10,
    translatorName: 'Ahmed Mansour',
    sourceLanguage: 'Árabe',
    targetLanguage: 'Inglés',
    specialty: 'Técnica',
    ratePerWord: 420,
    rating: 4.7,
    isAvailable: true,
    experienceYears: 11,
    deliveryTimeDays: 5,
    createdAt: '2024-02-10',
  },
];

/**
 * QUÉ: Arreglo de configuración para las categorías de filtrado.
 * PARA: Mapear las opciones del componente FilterPanel con etiquetas amigables.
 * IMPACTO: Facilita la generación dinámica de controles de UI para el filtrado por especialidad.
 */
export const categories: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'Todas las especialidades' },
  { value: 'Legal', label: 'Legal' },
  { value: 'Médica', label: 'Médica' },
  { value: 'Técnica', label: 'Técnica' },
  { value: 'Literaria', label: 'Literaria' },
  { value: 'Comercial', label: 'Comercial' },
];

/**
 * QUÉ: Opciones de ordenamiento disponibles en la interfaz.
 * PARA: Definir los criterios por los cuales el usuario puede organizar el catálogo.
 * IMPACTO: Determina el comportamiento del componente SortSelector y la lógica de orden en el Catalog.
 */
export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: 'Traductor (A-Z)' },
  { value: 'name-desc', label: 'Traductor (Z-A)' },
  { value: 'price-asc', label: 'Tarifa (Menor a Mayor)' },
  { value: 'price-desc', label: 'Tarifa (Mayor a Menor)' },
  { value: 'rating-desc', label: 'Mejor Valorados' },
];
// ============================================
// TIPOS Y INTERFACES DEL PROYECTO
// ============================================
// QUE: Definición de la capa de dominio y contratos de datos.
// PARA QUE: Establecer un esquema técnico único que normalice la estructura de objetos, 
//           respuestas de API y estados de la interfaz en toda la aplicación.
// IMPACTO: Garantiza la seguridad de tipos (Type Safety) en tiempo de compilación, 
//          reduce errores de propiedades indefinidas y facilita el mantenimiento 
//          al centralizar las reglas de negocio en un solo punto de verdad.

export interface Service {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    durationHours?: number;
    active: boolean;
}

/**
 * Interfaz para estadísticas del dashboard
 */
export interface Stats {
  totalProjects: number;     // Total de pedidos realizados
  activeProjects: number;    // Traducciones en curso
  wordsTranslated: number;   // Volumen total procesado
  availableLanguages: number; // Cobertura de idiomas actual
  priority?: 'low' | 'normal' | 'urgent';
}

/**
 * Interfaz para datos en tiempo real
 */
export interface RealTimeData {
  value: number;
  label: string;
  unit: string; // ej: "personas", "mesas", "libros"
  lastUpdated: string;
  status: 'pending' | 'translating' | 'review';
}

/**
 * Estado genérico para manejar peticiones asíncronas
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Tipo para filtros de búsqueda (opcional)
 */
export interface SearchFilters {
  query: string;
  language?: string;
  status: 'pending' | 'translating' | 'review';
  priority?: 'low' | 'normal' | 'urgent';
}

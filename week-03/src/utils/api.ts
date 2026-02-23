import type { Service, Stats, RealTimeData } from '../types';

// ============================================
// CONFIGURACIÓN
// ============================================

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ============================================
// DATOS MOCK: Servicios de Traducción
// ============================================

const MOCK_SERVICES: Service[] = [
  {
    id: 1,
    name: 'Traducción Jurídica',
    description: 'Contratos, actas notariales y documentos legales certificados.',
    category: 'Legal',
    price: 12000,
    durationHours: 48,
    active: true,
  },
  {
    id: 2,
    name: 'Traducción Técnica',
    description: 'Adaptación cultural y técnica de aplicaciones y videojuegos.',
    category: 'Tecnología',
    price: 15000,
    durationHours: 72,
    active: true,
  },
  {
    id: 3,
    name: 'Traducción Médica',
    description: 'Informes clínicos, protocolos farmacéuticos y ensayos.',
    category: 'Salud',
    price: 18000,
    durationHours: 24,
    active: true,
  },
  {
    id: 4,
    name: 'Traducción Literaria',
    description: 'Novelas, ensayos y contenido editorial creativo.',
    category: 'Editorial',
    price: 8000,
    durationHours: 120,
    active: false,
  },
  {
    id: 5,
    name: 'Express',
    description: 'Traducción y sincronización de contenido audiovisual.',
    category: 'Audiovisual',
    price: 15000,
    durationHours: 12,
    active: true,
  },
  {
    id: 6,
    name: 'Traducción Técnica',
    description: 'Manuales de ingeniería, maquinaria y guías de usuario.',
    category: 'Industrial',
    price: 10000,
    durationHours: 36,
    active: true,
  }
];

// ============================================
// FUNCIONES DE FETCH
// ============================================

/**
 * Obtiene la lista de servicios de traducción
 */
export const fetchItems = async (signal?: AbortSignal): Promise<Service[]> => {
  await delay(1000); // Simula latencia
  
  if (signal?.aborted) throw new Error('Petición cancelada');

  return MOCK_SERVICES;
};

/**
 * Obtiene estadísticas del dominio de traducción
 */
export const fetchStats = async (): Promise<Stats> => {
  await delay(800);

  // Simulamos cálculos basados en el mock
  const total = MOCK_SERVICES.length;
  const active = MOCK_SERVICES.filter(s => s.active).length;

  return {
    totalProjects: 1250,      // Total histórico
    activeProjects: active,    // Servicios activos actualmente
    wordsTranslated: 850400,   // KPI acumulado
    availableLanguages: 24,    // Métrica adicional
    priority: 'normal'
  };
};

/**
 * Obtiene datos en tiempo real (WPM - Words Per Minute)
 */
export const fetchRealTimeData = async (): Promise<RealTimeData> => {
  await delay(500);

  // Genera flujo de palabras aleatorio para el monitor
  const wordsPerMinute = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
  const statuses: ('pending' | 'translating' | 'review')[] = ['pending', 'translating', 'review'];

  return {
    value: wordsPerMinute,
    label: 'Velocidad de procesamiento actual',
    unit: 'WPM',
    lastUpdated: new Date().toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)]
  };
};

/**
 * Busca servicios por nombre o categoría
 */
export const searchItems = async (query: string): Promise<Service[]> => {
  await delay(600);

  if (!query.trim()) return MOCK_SERVICES;

  const lowQuery = query.toLowerCase();
  return MOCK_SERVICES.filter((item) =>
    item.name.toLowerCase().includes(lowQuery) ||
    item.category.toLowerCase().includes(lowQuery)
  );
};


/**
 * EJEMPLO DE INTEGRACIÓN REAL: 
 * Cómo adaptar datos externos (JSONPlaceholder) a nuestro modelo de 'Service'
 */
export const fetchServicesFromExternalAPI = async (
  signal?: AbortSignal,
): Promise<Service[]> => {
  // Usamos el endpoint de /users solo como ejemplo de origen de datos
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users',
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Error de red: ${response.status} - No se pudo conectar con el servidor`);
  }

  const externalData = await response.json();

  // TRANSFORMACIÓN (MAPPING):
  // Convertimos los campos de la API externa a nuestra interfaz 'Service'
  return externalData.map((item: any): Service => ({
    id: item.id,
    name: `Servicio: ${item.company.name}`, // Usamos el nombre de la compañía como nombre del servicio
    description: `Especialista en traducción: ${item.company.catchPhrase}`,
    category: item.id % 2 === 0 ? 'Tecnología' : 'Legal', // Lógica ficticia para categorizar
    price: (item.id * 15.5), // Generamos un precio basado en el ID
    durationHours: 24 + item.id,
    active: true,
  }));
};
console.log('🏛️ PROYECTO SEMANAL: MODELADO DE ENTIDADES SERVICIOS PROFESIONALES DE TRADUCIÓN\n');

// ============================================
// 1. ENTIDADES PRINCIPALES DEL DOMINIO
// ============================================


// QUÉ: Se define la entidad principal que es servicio, para definir la forma
// PARA: Se relaciona la estructura de datos, que atributos tiene un servicio
// IMPACTO: Se valida que los servicios cumplan esta estructura con TypeScript
interface Service {
    id: string;
    name: string;
    description: string;
    category: CategoryService;
    price: number;
    durationHours?: number;
    active: boolean;
}

// TODO: Define al menos otra interface relacionada 
interface Languages {
    id: number;
    name: string;
    code: string;
    isActive: boolean;
}

interface Client {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    company: string;
    isActive: boolean;
}

interface TranslationOrder {
    id: number;
    clientId: number;
    serviceId: number;
    sourceLanguageId: number;
    targetLanguageId: number;
    wordCount: number;
    totalPrice: number;
    createdAt: Date;
    deliveryDate: Date;
    status: OrderStatus;
}

// ============================================
// 2.UNIONS Y LITERALES PARA PROPIEDADES CLAVES
// ============================================

// QUÉ: Definir que el estado solo acepte 4 valores
// PARA: Validar en que estado se encuentra la orden de traducción
// IMPACTO: Definir en que estado se encuentra una orden
// TODO: Define un type union para un estado, categoría o rol relevante
type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

// QUÉ: Definir que el usuario tenga un rol y el servicio una categoría
// PARA: Identificar el rol de usuario y categoría del servicio
// IMPACTO: Definir en que estado se encuentra una orden
// TODO: Usa un type literal para limitar valores permitidos
type UserRole = 'client' | 'translator' | 'admin';
type CategoryService = 'basic' | 'premium';

// ============================================
// 3. Implementa funciones tipadas para operaciones básicas
// ============================================

// QUÉ:Crea una nueva entidad de servicio con un ID único
// PARA: Se estandariza la creación de objetos para un servicios
// IMPACTO: Se crea una nueva entidad
// TODO: Implementa una función que crea nueva una entidad
function createService(data: Omit<Service, "id">): Service {
    return {
        id: crypto.randomUUID(),
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        durationHours: data.durationHours ?? undefined,
        active: data.active ?? true
    };
}                                                                                                    

// QUÉ: Filtro que funciona por categoría en la lista de servicios
// PARA: Busqueda por nombre de categoría
// IMPACTO: Busqueda práctica por categoría
// TODO: Implementa una función que liste entidades
function listEntities(services: Service[], category?: CategoryService): Service[] {
    if (!category) return services;
    return services.filter(service => service.category === category);
}

// QUÉ: Filtra las ordenes por el estado
// PARA: Busqueda por estado de orden
// IMPACTO: Busqueda práctica por estado
// TODO: Implementa una función que filtre entidades por status/categoría
function filterByStatus(orders: TranslationOrder[], status: OrderStatus): TranslationOrder[] {
    return orders.filter(order => order.status === status);
}

// ============================================
// 4. Prueba tus funciones con datos de ejemplo
// ============================================


// QUÉ: Crea la instacia de un servicio para creación
// PARA: Registra el nuevo servicio
// IMPACTO: Permite crear instacias de servicios
const service = createService({
    name: "Traducción básica",
    description: "Atención básica de incidencias",
    category: "basic",
    price: 80000,
    durationHours: 1,
    active: true
});


// QUÉ: Se definen los servicios que estan disponibles para consulta de las funciones
// PARA: Permitir el uso de las funciones de filtro
// IMPACTO: Permite la validación de datos
const services: Service[] = [
    {
        id: '4cff7100-c0f8-4240-96b7-1f522bc62cb2',
        name: "Traducción básica",
        description: "Básico",
        category: "basic",
        price: 50000,
        active: true
    },
    {
        id: '5a7cac04-5686-4cb3-9129-a80d1c79a0cb',
        name: "Traducción estándar",
        description: "Avanzado",
        category: "premium",
        price: 120000,
        durationHours: 2,
        active: true
    }
];

// QUÉ: Se definen las ordenes que estan disponibles para consulta de las funciones
// PARA: Permitir el uso de las funciones de filtro
// IMPACTO: Permite la validación de datos
const orders: TranslationOrder[] = [
    {
        id: 1,
        clientId: 10,
        serviceId: 2,
        sourceLanguageId: 1,
        targetLanguageId: 2,
        wordCount: 1200,
        totalPrice: 90000,
        createdAt: new Date(),
        deliveryDate: new Date(),
        status: "pending"
    },
    {
        id: 2,
        clientId: 11,
        serviceId: 3,
        sourceLanguageId: 1,
        targetLanguageId: 3,
        wordCount: 2000,
        totalPrice: 150000,
        createdAt: new Date(),
        deliveryDate: new Date(),
        status: "completed"
    }
];

const basicServices = listEntities(services, "basic");
const pendingOrders = filterByStatus(orders, "pending");

// TODO: Crea algunos objetos de ejemplo y prueba las funciones
console.log(service);
console.log(basicServices);
console.log(pendingOrders);

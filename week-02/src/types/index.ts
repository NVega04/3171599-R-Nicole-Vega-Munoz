// ============================================
// TYPES: INTERFACES Y TIPOS
// ============================================
// Define aquí las interfaces para tu dominio

/**
 * NOTA PARA EL APRENDIZ:
 * Adapta esta interface a tu dominio asignado.
 *
 * Ejemplos:
 * - Biblioteca: Book { id, title, author, isbn, available, category }
 * - Farmacia: Medicine { id, name, price, stock, requiresPrescription, category }
 * - Gimnasio: Member { id, name, email, plan, startDate, active }
 * - Restaurante: Dish { id, name, category, price, available, description }
 */

// TODO: Define la interface principal de tu dominio
// Ejemplo para referencia (ELIMINAR y reemplazar con tu dominio):
export interface Item {
  id: number;
  serviceName: string;
  sourceLanguage: string;
  targetLanguage: string;
  serviceType: string;
  status: string;
  available: boolean;
}

// TODO: Si necesitas tipos adicionales, defínelos aquí
// Ejemplos:
// export type Category = 'fiction' | 'non-fiction' | 'science'; // Biblioteca
// export type MedicineCategory = 'analgésico' | 'antibiótico' | 'vitamina'; // Farmacia
// export type MembershipPlan = 'básico' | 'premium' | 'vip'; // Gimnasio

// TODO: Interface para props de formulario (opcional)
export interface FormData {
  serviceName: string;
  sourceLanguage: string;
  targetLanguage: string;
  serviceType: string;
  status: string;
}

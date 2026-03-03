// ============================================
// HOOK: useDebounce
// ============================================
// Retrasa la actualización de un valor

import { useState, useEffect } from 'react';

/**
 * QUÉ: Hook personalizado que retrasa la actualización de un estado basándose en un tiempo de espera.
 * PARA: Optimizar la búsqueda en tiempo real, evitando que la lógica de filtrado se ejecute en cada pulsación de tecla.
 * IMPACTO: Mejora significativamente el rendimiento de la aplicación y la experiencia del usuario al reducir procesos costosos.
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Establecer un temporizador para actualizar el valor después del retraso
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el temporizador si el valor cambia antes de que se cumpla el tiempo (cleanup)
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

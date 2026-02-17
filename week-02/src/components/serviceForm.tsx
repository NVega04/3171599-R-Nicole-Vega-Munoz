import { useState, useEffect } from 'react';
import { Item } from '../types';

interface ItemFormProps {
  onAdd: (item: Omit<Item, 'id'>) => void;
  onUpdate: (id: number, updates: Partial<Item>) => void;
  editingItem?: Item;
  onCancelEdit: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({
  onAdd,
  onUpdate,
  editingItem,
  onCancelEdit,
}) => {
  // ============================================
  // ESTADO DEL FORMULARIO
  // ============================================

  const initialState = {
    serviceName: '',    // Nombre del archivo o proyecto
    sourceLanguage: '',  // Idioma original
    targetLanguage: '',  // Idioma al que se traduce
    serviceType: 'standard', // Tipo: estándar, técnica, jurada, etc.
    status: 'pending',    // Estado: pendiente, en proceso, completado
    available: false
  };

  const [formData, setFormData] = useState(initialState);

  // ============================================
  // EFECTO: PRE-LLENAR FORMULARIO AL EDITAR
  // ============================================

  useEffect(() => {
    if (editingItem) {
      // TODO: Pre-llenar el formulario con los datos del elemento a editar
      // Tip: Extrae solo los campos necesarios (sin id)
      const { id, ...rest } = editingItem;
      setFormData(rest);
    } else {
      // Si no hay elemento editando, limpiar formulario
      setFormData(initialState);
    }
  }, [editingItem]);

  // ============================================
  // HANDLERS
  // ============================================

  /**
   * Manejar cambios en inputs de texto
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // TODO: Actualizar el estado del formulario
    // Tip: Usa spread operator para mantener los demás campos
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Manejar cambios en selects
   */
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Manejar cambios en checkboxes
   */
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  /**
   * Validar datos del formulario
   */
  const validate = (): boolean => {
    // TODO: Implementar validación según tu dominio
    // Ejemplos:
    // - Campos requeridos no vacíos
    // - Números positivos
    // - Emails válidos
    // - Fechas válidas

    if (!formData.serviceName.trim()) {
      alert('El nombre del servicio es requerido');
      return false;
    }

    if (!formData.sourceLanguage.trim() || !formData.targetLanguage.trim()) {
      alert('Debes especificar el idioma de origen y de destino');
      return false;
    }

    if (formData.serviceType === '') {
      alert('Por favor, seleccione un tipo de servicio profesional');
      return false;
    }

    // TODO: Agregar más validaciones específicas de tu dominio
    return true;
  };

  /**
   * Manejar submit del formulario
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Validar datos
    if (!validate()) return;

    // TODO: Agregar o actualizar según corresponda
    if (editingItem && editingItem.id !== undefined) {
      // Modo edición: actualizar
      onUpdate(editingItem.id, formData);
      onCancelEdit();
    } else {
      // Modo agregar: crear nuevo
      onAdd(formData);
    }

    // TODO: Limpiar formulario
    setFormData(initialState);
  };

  // ============================================
  // RENDER
  // ============================================


  return (
    <div className="form-container">
      <h2>{editingItem ? 'Editar servicio' : 'Solicitar nuevo servicio'}</h2>

      <form onSubmit={handleSubmit} className="item-form">
        
        {/* Campo: Nombre del Servicio */}
        <div className="form-group">
          <label htmlFor="serviceName">Nombre del servicio *</label>
          <input
            type="text"
            id="serviceName"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            placeholder="Ej: Traducción contrato laboral"
            required
          />
        </div>

        {/* Grupo: Idiomas (Origen y Destino) */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="sourceLanguage">Idioma origen *</label>
            <input
              type="text"
              id="sourceLanguage"
              name="sourceLanguage"
              value={formData.sourceLanguage}
              onChange={handleChange}
              placeholder="Ej: Español"
              required
            />
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="targetLanguage">Idioma destino *</label>
            <input
              type="text"
              id="targetLanguage"
              name="targetLanguage"
              value={formData.targetLanguage}
              onChange={handleChange}
              placeholder="Ej: Inglés"
              required
            />
          </div>
        </div>

        {/* Campo: Tipo de Servicio (Selector) */}
        <div className="form-group">
          <label htmlFor="serviceType">Tipo de servicio profesional</label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleSelectChange}
          >
            <option value="basico">Básico</option>
            <option value="especializado">Especializado</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        {/* Campo: Estado */}
        <div className="form-group">
          <label htmlFor="status">Estado del Proyecto</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleSelectChange}
          >
            <option value="pendiente">Pendiente</option>
            <option value="in-progress">En proceso</option>
            <option value="completado">Completado</option>
          </select>
        </div>
        <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleCheckboxChange}
              /> Disponible
            </label>
        </div>

        {/* Botones de acción */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingItem ? 'Actualizar servicio' : 'Agregar a la lista'}
          </button>

          {editingItem && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onCancelEdit();
                setFormData(initialState);
              }}
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ItemForm;

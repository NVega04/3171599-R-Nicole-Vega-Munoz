import { Item } from '../types';

/**
 * PROPS: servicesCard
 */
interface servicesCardProps {
  item: Item;
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
}

/**
 * COMPONENTE: servicesCard
 *
 * Tarjeta individual para mostrar un elemento.
 * Adapta la visualización a tu dominio específico.
 */
const ServicesCard: React.FC<servicesCardProps> = ({ item, onDelete, onEdit }) => {
  // ============================================
  // HANDLER: CONFIRMAR ELIMINACIÓN
  // ============================================

  const handleDelete = () => {
    // TODO (Opcional): Agregar confirmación antes de eliminar
    // Ejemplo:
    if (window.confirm(`¿Estás seguro de eliminar el servicio: "${item.serviceName}"?`)) {
      onDelete(item.id);
    }
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="item-card">
      {/* Información principal */}
      <div className="item-card__header">
        <h3 className="item-card__title">{item.serviceName}</h3>

        {/* Badge de estado del proyecto */}
        <span className={`badge badge--${item.status === 'completed' ? 'success' : item.status === 'in-progress' ? 'info' : 'warning'}`}>
          {item.status === 'completed' ? 'Completado' : item.status === 'in-progress' ? 'En Proceso' : 'Pendiente'}
        </span>
      </div>

      {/* Información detallada */}
      <div className="item-card__body">
        {/* Detalles del par de lenguas y especialidad */}
        <p><strong>Combinación:</strong> {item.sourceLanguage} → {item.targetLanguage}</p>
        <p><strong>Tipo:</strong> {item.serviceType}</p>
        
        {/* ID de seguimiento para control interno */}
        <p className="item-card__id">
          <small>Ref: #00{item.id}</small>
        </p>
      </div>

      {/* Acciones */}
      <div className="item-card__actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(item)}
          aria-label={`Editar ${item.serviceName}`}>
          Editar
        </button>

        <button
          className="btn btn-delete"
          onClick={handleDelete}
          aria-label={`Eliminar ${item.serviceName}`}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ServicesCard;

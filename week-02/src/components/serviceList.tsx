import { Item } from '../types';
import ServiceCard from './serviceCard';


/**
 * PROPS: ItemList
 */
interface ServiceListProps {
  items: Item[];
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
}

/**
 * COMPONENTE: ItemList
 *
 * Renderiza la lista de elementos usando .map()
 */
const ServiceList: React.FC<ServiceListProps> = ({ items, onDelete, onEdit }) => {
  // Manejar estado vacío
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay proyectos de traducción registrados</p>
        <p className="empty-state__hint">
          Comienza agregando un nuevo servicio de traducción
        </p>
      </div>
    );
  }

  // ============================================
  // RENDER: LISTA DE ELEMENTOS

  return (
    <div className="item-list" style={{ display: 'grid', gap: '1rem' }}>
      {items.map((item) => (
        <ServiceCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ServiceList;

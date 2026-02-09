# 🏛️ Plataforma de Servicios de Traducción | Servicios Profesionales

## 📌 Descripción del entregable semana 1
Este proyecto modela las **entidades principales y la lógica base** de una plataforma de **servicios profesionales de traducción**, utilizando **TypeScript** para garantizar tipado fuerte, validación de datos y una estructura escalable.

El sistema simula la gestión de **servicios, idiomas, clientes y órdenes de traducción**, aplicando buenas prácticas de modelado de dominio.

---

## 🧩 ¿Qué se desarrolló?

### 1. Modelado de entidades del dominio
Se definieron interfaces para representar los componentes clave de la plataforma:
- `Service`: Servicios de traducción
- `Languages`: Idiomas disponibles
- `Client`: Información de clientes
- `TranslationOrder`: Órdenes de traducción

Esto asegura una **estructura consistente, clara y tipada**.

---

### 2. Tipos literales y restricciones (Type Unions)
Se implementaron **type unions** para limitar valores permitidos, como:
- Estados de órdenes (`pending`, `in_progress`, `completed`, `cancelled`)
- Categorías de servicio (`basic`, `premium`)
- Roles de usuario (`client`, `translator`, `admin`)

Esto previene **errores de datos y mejora la integridad del sistema**.

---

### 3. Funciones tipadas para operaciones básicas
Se crearon funciones para simular lógica de negocio:
- `createService`: Crea servicios con ID único
- `listEntities`: Filtra servicios por categoría
- `filterByStatus`: Filtra órdenes por estado

Estas funciones representan **operaciones reales dentro de una plataforma de traducción**.

---

### 4. Datos de prueba y validación
Se agregaron **datos de prueba** para:
- Probar filtros de servicios
- Validar estados de órdenes
- Visualizar resultados en consola

---


## 🛠️ Tecnologías utilizadas
- TypeScript  
- Node.js  

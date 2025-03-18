# Product Management API

## Descripción

Este proyecto es una API de gestión de productos, implementada utilizando **NestJS** y **TypeORM**. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos, los cuales pueden ser consultados desde una base de datos local o desde la **FakeStore API** (una API externa de productos).

La API permite a los usuarios interactuar con los productos a través de rutas RESTful y está documentada con **Swagger** para facilitar su uso.

## Tecnologías

- **NestJS**: Framework de Node.js basado en TypeScript para crear aplicaciones eficientes y escalables.
- **TypeORM**: ORM (Object-Relational Mapper) para trabajar con bases de datos SQL.
- **Swagger**: Para la documentación interactiva de la API.
- **Axios**: Cliente HTTP para hacer peticiones a la API externa **FakeStore**.

## Estructura del Proyecto

1. **src/products**: Contiene los archivos relacionados con los productos.
   - **product.entity.ts**: Define la entidad del producto en la base de datos.
   - **dto/create-product.dto.ts**: Define la estructura de datos para crear un nuevo producto.
   - **dto/update-product-stock.dto.ts**: Define la estructura de datos para actualizar el stock de un producto.
   - **interfaces/fakestore-product.interface.ts**: Interfaz para mapear la respuesta de la FakeStore API.
   - **products.controller.ts**: Controlador que expone las rutas para interactuar con los productos.
   - **products.service.ts**: Servicio que contiene la lógica para obtener, crear, actualizar y eliminar productos.

2. **src/main.ts**: El punto de entrada de la aplicación.

3. **swagger-config.ts**: Configuración para habilitar la documentación Swagger.

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Jableed43/fakestore-api.git
   ```

2. Navega a la carpeta del proyecto:
   ```bash
   cd fakestore-api
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Ejecuta el proyecto en modo desarrollo:
   ```bash
   npm run start:dev
   ```

   Esto iniciará el servidor en el puerto `3000` por defecto.

5. Abre el navegador y accede a [http://localhost:3000/api](http://localhost:3000/api) para acceder a la documentación de la API generada por Swagger.

## Rutas de la API

### **GET /products**

Obtiene una lista de todos los productos.

#### Respuesta:
- `200 OK`: Lista de productos.

### **GET /products/:id**

Obtiene un producto por su ID.

#### Parámetros:
- `id`: El ID del producto a obtener.

#### Respuesta:
- `200 OK`: Un producto con los detalles.
- `404 Not Found`: Si el producto no se encuentra.

### **POST /products**

Crea un nuevo producto.

#### Cuerpo de la solicitud:
```json
{
  "title": "Nombre del Producto",
  "price": 100.00,
  "description": "Descripción del producto",
  "category": "Categoría del producto",
  "image": "URL de la imagen"
}
```

#### Respuesta:
- `201 Created`: Producto creado correctamente.

### **PUT /products/:id/stock**

Actualiza el stock de un producto.

#### Parámetros:
- `id`: El ID del producto cuyo stock se actualizará.

#### Cuerpo de la solicitud:
```json
{
  "stock": 100
}
```

#### Respuesta:
- `200 OK`: Stock actualizado correctamente.
- `404 Not Found`: Si el producto no se encuentra.

### **DELETE /products/:id**

Elimina un producto por su ID.

#### Parámetros:
- `id`: El ID del producto a eliminar.

#### Respuesta:
- `204 No Content`: Producto eliminado correctamente.
- `404 Not Found`: Si el producto no se encuentra.

## Dependencias

- **NestJS**: Framework principal de backend.
- **TypeORM**: ORM para interactuar con la base de datos.
- **Swagger**: Para la documentación de la API.
- **Axios**: Cliente HTTP para consumir la API externa **FakeStore**.
- **class-validator**: Para la validación de los datos de entrada.
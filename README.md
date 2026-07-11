Sistema de Gestion de Ventas - Actividad 3

Este proyecto consiste en un sistema desarrollado en TypeScript y Node.js que implementa un modulo de persistencia utilizando archivos JSON y la libreria fs/promises. Permite gestionar clientes, productos y el procesamiento de ventas con persistencia real y validaciones de datos antes de la escritura en el disco duro.

## Estructura del Proyecto

La organizacion de los archivos del codigo fuente dentro de la carpeta `src` se distribuye de la siguiente manera:

* **controller/**
  * `menuController.ts`: Contiene la logica de las vistas y el despliegue de los menus interactivos de la terminal para cada entidad.
* **data/**
  * `clientes.json`: Archivo fisico donde se almacena el cliente registrado.
  * `productos.json`: Archivo fisico que actua como base de datos del inventario.
  * `ventas.json`: Archivo fisico donde se guarda el historial de transacciones realizadas.
  * `inventario.ts`: Control de persistencia temporal en memoria para sincronizar el estado global de la sesion.
* **models/**
  * `Cliente.ts`: Estructuras, enums y validaciones del cliente (ID, NIT/DPI, Tipo de cliente).
  * `Producto.ts`: Estructuras, categorias y reglas de negocio para el catalogo de productos.
  * `Venta.ts`: Estructura y reglas para el procesamiento de transacciones de venta.
* **services/**
  * `calculos.ts`: Funciones encargadas de las operaciones de logica (CRUD) mutando la memoria.
  * `persistencia.ts`: Modulo que maneja exclusivamente la lectura y escritura asincrona en los archivos JSON con fs/promises.
* `index.ts`: Punto de entrada de la aplicacion que inicializa la base de datos y arranca el flujo principal.

### Por que esta organizacion? (Arquitectura en Capas)
Se implemento una arquitectura limpia dividida en capas para separar responsabilidades de manera estricta. De esta manera, cada seccion tiene una unica tarea asignada:
1. **Punto de Entrada (index.ts):** Solo se encarga de arrancar la aplicacion y mandar a cargar los datos de los JSON a la memoria al iniciar.
2. **Capa de Controladores (controller/):** Maneja la interaccion directa de la terminal con el usuario. Recibe los inputs, muestra las opciones y coordina los flujos de las pantallas sin procesar logica interna.
3. **Capa de Modelos (models/):** Controla las reglas de los objetos de negocio, asegurando que los datos esten limpios y validados antes de realizar cualquier operacion.
4. **Capa de Datos (data/):** Funciona como el almacenamiento local del sistema, reteniendo los archivos JSON fisicos y las variables globales que simulan la base de datos en memoria.
5. **Capa de Servicios (services/):** Es el motor del sistema. Se divide en `calculos.ts` para procesar los cambios contables en los arreglos y `persistencia.ts` para realizar la escritura y lectura asincrona, aislando el manejo de errores del resto de la aplicacion.

## Requisitos Previos
Antes de ejecutar el proyecto, es necesario tener instalado en la computadora:
1. Node.js (Version 18 o superior recomendada)
2. pnpm (Gestor de paquetes utilizado para el proyecto)

Si no tienes pnpm instalado de forma global en tu computadora, puedes instalarlo abriendo una terminal y ejecutando el siguiente comando de Node:
```bash
npm install -g pnpm
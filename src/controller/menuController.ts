import promptSync from "prompt-sync";
import { TipoCliente, verificarCliente } from "../models/Cliente.js";
import { CategoriaProducto, verificarProducto } from "../models/Producto.js";
import { verificarVenta } from "../models/Venta.js";
import { 
  crearCliente, 
  leerCliente, 
  actualizarCliente, 
  eliminarCliente, 
  crearProducto, 
  leerProductos, 
  actualizarProducto, 
  eliminarProducto,
  crearVenta,
  leerVentas
} from "../services/calculos.js";
import type { ICliente } from "../models/Cliente.js";
import type { IProducto } from "../models/Producto.js";
import type { IVenta } from "../models/Venta.js";

const leerInput = promptSync({ sigint: true });

export async function menuClientes(): Promise<void> {
  let enMenu = true;
  while (enMenu) {
    console.log("\n--CRUD DE CLIENTES---");
    console.log("1. Registrar");
    console.log("2. Mostrar");
    console.log("3. Modificar");
    console.log("4. Dar de baja");
    console.log("5. Volver");
    const op = leerInput("Opcion: ");

    try {
      switch (op) {
        case "1": {
          const id = parseInt(leerInput("ID: "));
          const nombre = leerInput("Nombre: ");
          const identificacion = leerInput("NIT o DPI: ");
          console.log("Tipos: Regular, Corporativo, Vip");
          const entradaTipo = leerInput("Tipo: ").toLowerCase();
          const tipo = Object.values(TipoCliente).find(t => t === entradaTipo) as TipoCliente;
          const correo = leerInput("Email: ");

          const cliente: Partial<ICliente> = { id, nombre, identificacion, tipo, correo };
          const aud = verificarCliente(cliente);
          if (aud.esValido) {
            await crearCliente(cliente as ICliente);
            console.log("Cliente guardado con exito.");
          } else {
            aud.fallos.forEach(f => console.log(` -> ${f}`));
          }
          break;
        }
        case "2": {
          const c = leerCliente();
          console.log(c ? JSON.stringify(c, null, 2) : "No hay cliente registrado.");
          break;
        }
        case "3": {
          if (!leerCliente()) {
            console.log("No existe cliente para modificar.");
            break;
          }
          const nombre = leerInput("Nuevo Nombre (dejar vacio para omitir): ");
          const correo = leerInput("Nuevo Email (dejar vacio para omitir): ");
          const cambios: Partial<ICliente> = {};
          if (nombre) cambios.nombre = nombre;
          if (correo) cambios.correo = correo;
          await actualizarCliente(cambios);
          console.log("Cliente actualizado.");
          break;
        }
        case "4":
          await eliminarCliente();
          console.log("Cliente eliminado.");
          break;
        case "5":
          enMenu = false;
          break;
        default:
          console.log("Opcion no valida.");
      }
    } catch (error: any) {
      console.log(`\nError en modulo clientes: ${error.message}`);
      leerInput("Presione Enter para continuar...");
    }
  }
}

export async function menuProductos(): Promise<void> {
  let enMenu = true;
  while (enMenu) {
    console.log("\n--- CRUD PRODUCTOS ---");
    console.log("1. Agregar Producto");
    console.log("2. Listar Inventario");
    console.log("3. Editar Precios/Stock");
    console.log("4. Remover del Almacen");
    console.log("5. Volver");
    const op = leerInput("Opcion: ");

    try {
      switch (op) {
        case "1": {
          const codigo = leerInput("Codigo: ");
          const nombre = leerInput("Nombre: ");
          console.log("Categorias: Tecnologia, Hogar, Servicios");
          const entradaCat = leerInput("Categoria: ").toLowerCase();
          const categoria = Object.values(CategoriaProducto).find(c => c === entradaCat) as CategoriaProducto;
          const precio = parseFloat(leerInput("Precio: "));
          const existencia = parseInt(leerInput("Existencia: "));

          const prod: Partial<IProducto> = { codigo, nombre, categoria, precio, existencia };
          const aud = verificarProducto(prod);
          if (aud.esValido) {
            await crearProducto(prod as IProducto);
            console.log("Producto agregado al inventario.");
          } else {
            aud.fallos.forEach(f => console.log(` -> ${f}`));
          }
          break;
        }
        case "2": {
          const lista = leerProductos();
          if (lista.length > 0) {
            console.table(lista);
          } else {
            console.log("El inventario esta vacio.");
          }
          break;
        }
        case "3": {
          const cod = leerInput("Codigo del producto a editar: ");
          const precio = parseFloat(leerInput("Nuevo Precio (0 para omitir): "));
          const stock = parseInt(leerInput("Nueva Existencia (-1 para omitir): "));
          const cambios: Partial<IProducto> = {};
          if (precio > 0) cambios.precio = precio;
          if (stock >= 0) cambios.existencia = stock;

          const modificado = await actualizarProducto(cod, cambios);
          console.log(modificado ? "Producto actualizado." : "Producto no encontrado.");
          break;
        }
        case "4": {
          const cod = leerInput("Codigo del producto a eliminar: ");
          const eliminado = await eliminarProducto(cod);
          console.log(eliminado ? "Producto eliminado." : "No se encontro el codigo.");
          break;
        }
        case "5":
          enMenu = false;
          break;
        default:
          console.log("Opcion no valida.");
      }
    } catch (error: any) {
      console.log(`\nerror en modulo productos: ${error.message}`);
      leerInput("Presione Enter para continuar...");
    }
  }
}

export async function menuVentas(): Promise<void> {
  let enMenu = true;
  while (enMenu) {
    console.log("\n--- CRUD VENTAS ---");
    console.log("1. Registrar Venta");
    console.log("2. Mostrar Historial");
    console.log("3. Volver");
    const op = leerInput("Opcion: ");

    try {
      switch (op) {
        case "1": {
          const id = parseInt(leerInput("ID Venta: "));
          const codigoProducto = leerInput("Codigo de Producto: ");
          const cantidad = parseInt(leerInput("Cantidad: "));

          const inventario = leerProductos();
          const producto = inventario.find(p => p.codigo === codigoProducto);

          if (!producto) {
            console.log("El producto no existe en el inventario.");
            break;
          }

          if (producto.existencia < cantidad) {
            console.log("No hay suficiente stock disponible.");
            break;
          }

          const total = producto.precio * cantidad;
          const venta: Partial<IVenta> = { id, codigoProducto, cantidad, total };
          const aud = verificarVenta(venta);

          if (aud.esValido) {
            producto.existencia -= cantidad;
            await actualizarProducto(producto.codigo, { existencia: producto.existencia });
            await crearVenta(venta as IVenta);
            console.log(`Venta procesada con exito. Total: Q${total}`);
          } else {
            aud.fallos.forEach(f => console.log(` -> ${f}`));
          }
          break;
        }
        case "2": {
          const lista = leerVentas();
          if (lista.length > 0) {
            console.table(lista);
          } else {
            console.log("No hay ventas registradas.");
          }
          break;
        }
        case "3":
          enMenu = false;
          break;
        default:
          console.log("Opcion no valida.");
      }
    } catch (error: any) {
      console.log(`\nError en modulo ventas: ${error.message}`);
      leerInput("Presione Enter para continuar...");
    }
  }
}
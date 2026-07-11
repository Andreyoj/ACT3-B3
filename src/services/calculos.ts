import { registroVentas } from "../data/inventario.js";
import { guardarVentas } from "./persistencia.js";
import type { IVenta } from "../models/Venta.js";
import { inventarioProductos, clienteRegistrado, setClienteRegistrado } from "../data/inventario.js";
import { guardarProductos, guardarCliente } from "./persistencia.js";
import type { IProducto } from "../models/Producto.js";
import type { ICliente } from "../models/Cliente.js";

export async function crearProducto(producto: IProducto): Promise<void> {
    inventarioProductos.push(producto);
    await guardarProductos(inventarioProductos);
}

export function leerProductos(): IProducto[] {
    return inventarioProductos;
}

export async function actualizarProducto(codigo: string, nuevosDatos: Partial<IProducto>): Promise<boolean> {
    const index = inventarioProductos.findIndex(p => p.codigo === codigo);
    if (index !== -1) {
        inventarioProductos[index] = { ...inventarioProductos[index], ...nuevosDatos };
        await guardarProductos(inventarioProductos);
        return true;
    }
    return false;
}

export async function eliminarProducto(codigo: string): Promise<boolean> {
    const index = inventarioProductos.findIndex(p => p.codigo === codigo);
    if (index !== -1) {
        inventarioProductos.splice(index, 1);
        await guardarProductos(inventarioProductos);
        return true;
    }
    return false;
}

export async function crearCliente(cliente: ICliente): Promise<void> {
    setClienteRegistrado(cliente);
    await guardarCliente(cliente);
}

export function leerCliente(): ICliente | null {
    return clienteRegistrado;
}

export async function actualizarCliente(nuevosDatos: Partial<ICliente>): Promise<boolean> {
    if (clienteRegistrado) {
        setClienteRegistrado({ ...clienteRegistrado, ...nuevosDatos });
        await guardarCliente(clienteRegistrado);
        return true;
    }
    return false;
}

export async function eliminarCliente(): Promise<void> {
    setClienteRegistrado(null);
    await guardarCliente(null);
}

export async function crearVenta(venta: IVenta): Promise<void> {
    registroVentas.push(venta);
    await guardarVentas(registroVentas);
}

export function leerVentas(): IVenta[] {
    return registroVentas;
}
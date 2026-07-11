import fs from 'fs/promises';
import path from 'path';
import type { IProducto } from '../models/Producto.js';
import type { ICliente } from '../models/Cliente.js';

const PRODUCTOS_PATH = path.join(process.cwd(), 'src', 'data', 'productos.json');
const CLIENTES_PATH = path.join(process.cwd(), 'src', 'data', 'clientes.json');

export async function guardarProductos(productos: IProducto[]): Promise<void> {
    try {
        const data = JSON.stringify(productos, null, 2);
        await fs.writeFile(PRODUCTOS_PATH, data, 'utf-8');
        console.log("\nProductos guardados correctamente en el archivo JSON.");
    } catch (error: any) {
        console.error("\nNo se pudieron guardar los productos:", error.message);
        throw error;
    }
}

export async function obtenerProductos(): Promise<IProducto[]> {
    try {
        const data = await fs.readFile(PRODUCTOS_PATH, 'utf-8');
        if (!data.trim()) return [];
        return JSON.parse(data) as IProducto[];
    } catch (error: any) {
        if (error.code === 'ENOENT') return [];
        console.error("\nFallo al leer productos:", error.message);
        return [];
    }
}

export async function guardarCliente(cliente: ICliente | null): Promise<void> {
    try {
        const data = JSON.stringify(cliente, null, 2);
        await fs.writeFile(CLIENTES_PATH, data, 'utf-8');
        console.log("\nCliente guardado correctamente en el archivo JSON.");
    } catch (error: any) {
        console.error("\nNo se pudo guardar el cliente:", error.message);
        throw error;
    }
}

export async function obtenerCliente(): Promise<ICliente | null> {
    try {
        const data = await fs.readFile(CLIENTES_PATH, 'utf-8');
        if (!data.trim()) return null;
        return JSON.parse(data) as ICliente;
    } catch (error: any) {
        if (error.code === 'ENOENT') return null;
        console.error("\nFallo al leer los datos del cliente:", error.message);
        return null;
    }
}

import type { IVenta } from '../models/Venta.js';
const VENTAS_PATH = path.join(process.cwd(), 'src', 'data', 'ventas.json');

export async function guardarVentas(ventas: IVenta[]): Promise<void> {
    try {
        const data = JSON.stringify(ventas, null, 2);
        await fs.writeFile(VENTAS_PATH, data, 'utf-8');
        console.log("\nVentas guardadas correctamente en el archivo JSON.");
    } catch (error: any) {
        console.error("\nNo se pudieron guardar las ventas:", error.message);
        throw error;
    }
}

export async function obtenerVentas(): Promise<IVenta[]> {
    try {
        const data = await fs.readFile(VENTAS_PATH, 'utf-8');
        if (!data.trim()) return [];
        return JSON.parse(data) as IVenta[];
    } catch (error: any) {
        if (error.code === 'ENOENT') return [];
        console.error("\nFallo al leer ventas:", error.message);
        return [];
    }
}
import type { ICliente } from "../models/Cliente.js";
import type { IProducto } from "../models/Producto.js";

export let clienteRegistrado: ICliente | null = null;
export let inventarioProductos: IProducto[] = [];

export const setClienteRegistrado = (cliente: ICliente | null) => {
    clienteRegistrado = cliente;
};

export const setInventarioProductos = (productos: IProducto[]) => {
    inventarioProductos = productos;
};

import type { IVenta } from "../models/Venta.js";
export let registroVentas: IVenta[] = [];

export const setRegistroVentas = (ventas: IVenta[]) => {
    registroVentas = ventas;
};
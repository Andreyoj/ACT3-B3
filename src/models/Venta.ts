export interface IVenta {
  id: number;
  codigoProducto: string;
  cantidad: number;
  total: number;
}

export function verificarVenta(datos: Partial<IVenta>): { esValido: boolean; fallos: string[] } {
  const fallos: string[] = [];

  if (datos.id === undefined || datos.id <= 0) fallos.push("El ID de la venta debe ser mayor a 0.");
  if (!datos.codigoProducto?.trim()) fallos.push("El codigo del producto es obligatorio.");
  if (datos.cantidad === undefined || datos.cantidad <= 0) fallos.push("La cantidad debe ser mayor a 0.");

  return { esValido: fallos.length === 0, fallos };
}
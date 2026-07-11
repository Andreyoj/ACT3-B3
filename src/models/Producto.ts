export enum CategoriaProducto {
  Tecnologia = "tecnologia",
  Hogar = "hogar",
  Servicios = "servicios"
}

export interface IProducto {
  codigo: string;
  nombre: string;
  categoria: CategoriaProducto;
  precio: number;
  existencia: number;
}

export function verificarProducto(datos: Partial<IProducto>): { esValido: boolean; fallos: string[] } {
  const fallos: string[] = [];

  if (!datos.codigo?.trim()) fallos.push("El codigo es obligatorio.");
  if (!datos.nombre?.trim()) fallos.push("El nombre es requerido.");
  if (!datos.categoria) fallos.push("La categoria no es valida.");
  if (datos.precio === undefined || datos.precio <= 0) fallos.push("El precio debe ser mayor a 0.");
  if (datos.existencia === undefined || datos.existencia < 0) fallos.push("La existencia no puede ser negativa.");

  return { esValido: fallos.length === 0, fallos };
}
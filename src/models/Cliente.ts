export enum TipoCliente {
  Regular = "regular",
  Corporativo = "corporativo",
  Vip = "vip"
}

export interface ICliente {
  id: number;
  nombre: string;
  identificacion: string;
  tipo: TipoCliente;
  correo: string;
}

export function verificarCliente(datos: Partial<ICliente>): { esValido: boolean; fallos: string[] } {
  const fallos: string[] = [];
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!datos.nombre?.trim()) fallos.push("El nombre es requerido.");
  if (!datos.identificacion?.trim()) fallos.push("La identificacion no puede quedar vacia.");
  if (!datos.correo || !patronCorreo.test(datos.correo)) fallos.push("El correo electronico no es valido.");
  if (!datos.tipo) fallos.push("El tipo de cliente no es valido.");

  return { esValido: fallos.length === 0, fallos };
}
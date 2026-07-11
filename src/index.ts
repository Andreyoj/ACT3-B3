// src/index.ts
import promptSync from "prompt-sync";
import { obtenerProductos, obtenerCliente, obtenerVentas } from "./services/persistencia.js";
import { setInventarioProductos, setClienteRegistrado, setRegistroVentas } from "./data/inventario.js";
import { menuClientes, menuProductos, menuVentas } from "./controller/menuController.js";

const leerInput = promptSync({ sigint: true });

async function iniciarAplicacion() {
  try {
    console.log("Cargando base de datos persistente...");
    setInventarioProductos(await obtenerProductos());
    setClienteRegistrado(await obtenerCliente());
    setRegistroVentas(await obtenerVentas());

    let continuar = true;

    while (continuar) {
      console.log("SISTEMA DE GESTION");
      console.log("=======================================");
      console.log("1. Gestionar Clientes");
      console.log("2. Gestionar Productos");
      console.log("3. Gestionar Ventas");
      console.log("4. Salir del programa");
      console.log("=======================================");

      const seleccion = leerInput("Seleccione una opcion: ").trim();

      switch (seleccion) {
        case "1":
          await menuClientes();
          break;
        case "2":
          await menuProductos();
          break;
        case "3":
          await menuVentas();
          break;
        case "4":
          console.log("Cerrando el sistema. Feliz dia!");
          continuar = false;
          break;
        default:
          console.log("Opcion invalida.");
      }
    }
  } catch (error: any) {
    console.error("Fallo critico al iniciar la aplicacion:", error.message);
  }
}

iniciarAplicacion();
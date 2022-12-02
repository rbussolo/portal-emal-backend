import { Router } from "express";
import { ensuredAuthenticad } from "../middlewares/EnsureAuthenticated";
import { ListPedidoController } from "../modules/emal/pedido/useCases/list/ListPedidoController";

const pedidosRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const listPedidoController = new ListPedidoController();

pedidosRoutes.get("/", ensuredAuthenticad, wrap(listPedidoController.handle));

export { pedidosRoutes };

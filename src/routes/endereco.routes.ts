import { Router } from "express";
import { ensuredAuthenticad } from "../middlewares/EnsureAuthenticated";
import { ListCidadeController } from "../modules/emal/endereco/useCases/listCidade/ListCidadeController";
import { ListEstadoController } from "../modules/emal/endereco/useCases/listEstado/ListEstadoController";

const endereRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const listEstadoController = new ListEstadoController();
const listCidadeController = new ListCidadeController();

endereRoutes.get("/estados", ensuredAuthenticad, wrap(listEstadoController.handle));
endereRoutes.get("/cidades/:id", ensuredAuthenticad, wrap(listCidadeController.handle));

export { endereRoutes };

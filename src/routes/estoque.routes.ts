import { Router } from "express";
import { ensuredAuthenticad } from "../middlewares/EnsureAuthenticated";
import { ListEstoqueController } from "../modules/emal/estoques/useCases/list/ListEstoqueController";

const estoquesRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const listEstoqueController = new ListEstoqueController();

estoquesRoutes.get("/", ensuredAuthenticad, wrap(listEstoqueController.handle));

export { estoquesRoutes };

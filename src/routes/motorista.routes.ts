import { Router } from "express";
import { ensuredAuthenticad } from "../middlewares/EnsureAuthenticated";
import { MotoristaController } from "../modules/emal/motorista/useCases/create/MotoristaController";
import { ListMotoristaController } from "../modules/emal/motorista/useCases/list/ListMotoristaController";

const motoristasRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const list = new ListMotoristaController();
const controller = new MotoristaController();

motoristasRoutes.get("/", ensuredAuthenticad, wrap(list.handle));
motoristasRoutes.post("/", ensuredAuthenticad, wrap(controller.insert));
motoristasRoutes.put("/:id", ensuredAuthenticad, wrap(controller.update));

export { motoristasRoutes };

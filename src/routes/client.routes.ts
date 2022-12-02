import { Router } from "express";
import { ensuredAuthenticad } from "../middlewares/EnsureAuthenticated";
import { GetClientByCpfCnpjController } from "../modules/emal/clients/useCases/getByCpfCnpj/GetClientByCpfCnpjController";
import { ListClientController } from "../modules/emal/clients/useCases/list/ListClientController";

const clientsRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const getClienteByCpfCnpjController = new GetClientByCpfCnpjController();
const listClientController = new ListClientController();

clientsRoutes.get("/byCpfCnpj/:cpf_cnpj", ensuredAuthenticad, wrap(getClienteByCpfCnpjController.handle));
clientsRoutes.get("/", ensuredAuthenticad, wrap(listClientController.handle));

export { clientsRoutes };

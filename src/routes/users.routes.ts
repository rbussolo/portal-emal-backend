import { Router } from "express";
import { ensuredAuthenticad } from "../middlewares/EnsureAuthenticated";
import { CreateUserController } from "../modules/users/useCases/create/CreateUserController";
import { DeleteUserController } from "../modules/users/useCases/delete/DeleteUserController";
import { GetUserByIdController } from "../modules/users/useCases/getById/GetUserByIdController";
import { ListUserController } from "../modules/users/useCases/list/ListUserController";
import { UpdateUserController } from "../modules/users/useCases/update/UpdateUserController";
import { CreateUserClientController } from "../modules/users/useCases/userClient/create/CreateUserClientController";
import { DeleteUserClientController } from "../modules/users/useCases/userClient/delete/DeleteUserClientController";
import { ListUserClientController } from "../modules/users/useCases/userClient/list/ListUserClientController";
import { StateUserClientController } from "../modules/users/useCases/userClient/state/StateUserClientController";
import { UpdateUserClientController } from "../modules/users/useCases/userClient/update/UpdateUserClientController";

const usersRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const createUserController = new CreateUserController();
const getUserByIdController = new GetUserByIdController();
const listUserController = new ListUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

const listUserClientController = new ListUserClientController();
const deleteUserClientController = new DeleteUserClientController();
const createUserClientController = new CreateUserClientController();
const updateUserClientController = new UpdateUserClientController();
const stateUserClientController = new StateUserClientController();

usersRoutes.post("/", ensuredAuthenticad, wrap(createUserController.handle));
usersRoutes.get("/:id", ensuredAuthenticad, wrap(getUserByIdController.handle));
usersRoutes.get("/", ensuredAuthenticad, wrap(listUserController.handle));
usersRoutes.put("/:id", ensuredAuthenticad, wrap(updateUserController.handle));
usersRoutes.delete("/:id", ensuredAuthenticad, wrap(deleteUserController.handle));

usersRoutes.post("/clients/", ensuredAuthenticad, wrap(createUserClientController.handle));
usersRoutes.post("/clients/:user_id", ensuredAuthenticad, wrap(updateUserClientController.handle));
usersRoutes.get("/clients/:user_id", ensuredAuthenticad, wrap(listUserClientController.handle));
usersRoutes.put("/clients/:id", ensuredAuthenticad, wrap(stateUserClientController.handle));
usersRoutes.delete("/clients/:id", ensuredAuthenticad, wrap(deleteUserClientController.handle));

export { usersRoutes };

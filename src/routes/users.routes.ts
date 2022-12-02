import { Router } from "express";
import { ensuredAuthenticad } from "../middlewares/EnsureAuthenticated";
import { CreateUserController } from "../modules/users/useCases/create/CreateUserController";
import { DeleteUserController } from "../modules/users/useCases/delete/DeleteUserController";
import { GetUserByIdController } from "../modules/users/useCases/getById/GetUserByIdController";
import { ListUserController } from "../modules/users/useCases/list/ListUserController";
import { UpdateUserController } from "../modules/users/useCases/update/UpdateUserController";

const usersRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const createUserController = new CreateUserController();
const getUserByIdController = new GetUserByIdController();
const listUserController = new ListUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post("/", ensuredAuthenticad, wrap(createUserController.handle));
usersRoutes.get("/:id", ensuredAuthenticad, wrap(getUserByIdController.handle));
usersRoutes.get("/", ensuredAuthenticad, wrap(listUserController.handle));
usersRoutes.put("/:id", ensuredAuthenticad, wrap(updateUserController.handle));
usersRoutes.delete("/:id", ensuredAuthenticad, wrap(deleteUserController.handle));

export { usersRoutes };

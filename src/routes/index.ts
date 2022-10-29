import { AuthenticateUserController } from './../modules/users/useCases/authenticateUser/AuthenticateUserController';
import { Router } from "express";
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { ListUserController } from '../modules/users/useCases/listUser/ListUserController';

const router = Router();

router.post("/session", new AuthenticateUserController().handle);

router.post("/users", new CreateUserController().handle);
router.get("/users", new ListUserController().handle);

export { router };
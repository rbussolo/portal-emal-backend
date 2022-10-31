import { Router } from "express";

import { AuthenticateController } from '../modules/auth/authentitace/AuthenticateController';
import { RefreshTokenController } from './../modules/auth/refresh/RefreshTokenController';

import { ensuredAuthenticad } from '../middlewares/EnsureAuthenticated';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { ListUserController } from '../modules/users/useCases/listUser/ListUserController';
import { UpdateUserController } from '../modules/users/useCases/updateUser/UpdateUserController';
import { ForgotPasswordController } from '../modules/users/useCases/forgotPassword/ForgorPasswordController';

const router = Router();

router.post("/auth/sign", new AuthenticateController().handle);
router.post("/auth/refresh", new RefreshTokenController().handle);
router.post("/user/forgotPassword", new ForgotPasswordController().handle);

router.post("/users", ensuredAuthenticad, new CreateUserController().handle);
router.get("/users", ensuredAuthenticad, new ListUserController().handle);
router.put("/users/:id", ensuredAuthenticad, new UpdateUserController().handle);

export { router };
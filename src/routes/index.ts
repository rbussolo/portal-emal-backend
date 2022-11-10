import { Router } from "express";

import { AuthenticateController } from '../modules/auth/authenticate/AuthenticateController';
import { RefreshTokenController } from './../modules/auth/refresh/RefreshTokenController';

import { ensuredAuthenticad } from '../middlewares/EnsureAuthenticated';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { ListUserController } from '../modules/users/useCases/listUser/ListUserController';
import { UpdateUserController } from '../modules/users/useCases/updateUser/UpdateUserController';
import { ForgotPasswordController } from '../modules/users/useCases/forgotPassword/ForgorPasswordController';
import { MigrateuserController } from "../modules/emal/clients/useCases/migrateUser/MigrateUserController";
import { ResetPasswordController } from "../modules/users/useCases/resetPassword/ResetPasswordController";
import { NewPasswordController } from "../modules/emal/clients/useCases/newPassword/NewPasswordController";
import { ResetCheckController } from "../modules/users/useCases/resetCheck/ResetCheckController";

const router = Router();

router.post("/api/auth/sign", new AuthenticateController().handle);
router.post("/api/auth/refresh", new RefreshTokenController().handle);
router.post("/api/user/forgotPassword", new ForgotPasswordController().handle);
router.post("/api/user/checkToken/:token", new ResetCheckController().handle);
router.post("/api/user/resetPassword/:token", new ResetPasswordController().handle);
router.post("/api/user/migrate", new MigrateuserController().handle);
router.post("/api/user/migrate/new/:token", new NewPasswordController().handle);

router.post("/api/users", ensuredAuthenticad, new CreateUserController().handle);
router.get("/api/users", ensuredAuthenticad, new ListUserController().handle);
router.put("/api/users/:id", ensuredAuthenticad, new UpdateUserController().handle);

export { router };
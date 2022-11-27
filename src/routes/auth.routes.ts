import { Router } from "express";
import { AuthenticateController } from "../modules/auth/authenticate/AuthenticateController";
import { RefreshTokenController } from "../modules/auth/refresh/RefreshTokenController";
import { ForgetEmailController } from "../modules/emal/clients/useCases/forgetEmail/ForgetEmailController";
import { MigrateUserController } from "../modules/emal/clients/useCases/migrateUser/MigrateUserController";
import { NewPasswordController } from "../modules/emal/clients/useCases/newPassword/NewPasswordController";
import { ForgotPasswordController } from "../modules/users/useCases/forgotPassword/ForgorPasswordController";
import { ResetCheckController } from "../modules/users/useCases/resetCheck/ResetCheckController";
import { ResetPasswordController } from "../modules/users/useCases/resetPassword/ResetPasswordController";

const authRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const authenticateController = new AuthenticateController();
const refreshTokenController = new RefreshTokenController();
const forgotPasswordController = new ForgotPasswordController();
const forgotEmailController = new ForgetEmailController();
const resetCheckController = new ResetCheckController();
const resetPasswordController = new ResetPasswordController();
const migrateUserController = new MigrateUserController();
const newPasswordController = new NewPasswordController();

authRoutes.post("/sign", wrap(authenticateController.handle));
authRoutes.post("/refresh", wrap(refreshTokenController.handle));
authRoutes.post("/forgotPassword", wrap(forgotPasswordController.handle));
authRoutes.post("/forgotEmail", wrap(forgotEmailController.handle));
authRoutes.post("/checkToken/:token", wrap(resetCheckController.handle));
authRoutes.post("/resetPassword/:token", wrap(resetPasswordController.handle));
authRoutes.post("/migrate", wrap(migrateUserController.handle));
authRoutes.post("/migrate/new/:token", wrap(newPasswordController.handle));

export { authRoutes };
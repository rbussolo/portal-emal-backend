import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { PasswordError } from "../../../../../errors/PasswordError";
import { ResetPasswordService } from "./ResetPasswordService";

export class ResetPasswordController {
  async handle(request: Request, response: Response){
    const token = request.params.token;
    const { password } = request.body;

    const service = new ResetPasswordService();
    const result = await service.execute({ token, password });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    } else if (result instanceof PasswordError) {
      return response.status(result.statusCode).json({ message: result.message, messages: result.messages });
    }

    return response.json({ message: "Senha alterada com sucesso!" });
  }
}
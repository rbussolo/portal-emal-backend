import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { PasswordError } from "../../../../../errors/PasswordError";
import { NewPasswordService } from "./NewPasswordService";

export class NewPasswordController {
  async handle(request: Request, response: Response){
    const token = request.params.token;
    const { password } = request.body;

    const service = new NewPasswordService();
    const result = await service.execute({ token, password });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    } else if (result instanceof PasswordError) {
      return response.status(result.statusCode).json({ message: result.message, messages: result.messages });
    }

    return response.json(result);
  }
}
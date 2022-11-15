import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { ForgetEmailService } from "./ForgetEmailService";

export class ForgetEmailController {
  async handle(request: Request, response: Response) {
    const { cpf_cnpj } = request.body;

    const service = new ForgetEmailService();
    const result = await service.execute({ cpf_cnpj });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
import { AppError } from './../../../../../errors/AppError';
import { Request, Response } from "express";
import { MigrateUserService } from "./MigrateUserService";

export class MigrateuserController {
  async handle(request: Request, response: Response) {
    const { cpf_cnpj, email } = request.body;

    const service = new MigrateUserService();
    const result = await service.execute({ cpf_cnpj, email });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
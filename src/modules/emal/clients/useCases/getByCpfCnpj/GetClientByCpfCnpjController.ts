import { GetClientByCpfCnpjService } from './GetClientByCpfCnpjService';
import { Request, Response } from "express";
import { AppError } from '../../../../../errors/AppError';

export class GetClientByCpfCnpjController {
  async handle(request: Request, response: Response) {
    const { cpf_cnpj } = request.params;

    const service = new GetClientByCpfCnpjService();
    const result = await service.execute(cpf_cnpj);

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
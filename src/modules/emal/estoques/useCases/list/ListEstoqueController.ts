import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { ListEstoqueService } from "./ListEstoqueService";

export class ListEstoqueController {
  async handle(request: Request, response: Response) {
    const { page, amount, name, cod } = request.query;

    const service = new ListEstoqueService();
    const result = await service.execute({ page, amount, name, cod });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
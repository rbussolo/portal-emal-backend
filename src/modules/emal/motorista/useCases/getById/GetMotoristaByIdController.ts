import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { GetMotoristaByIdService } from "./GetMotoristaByIdService";

export class GetMotoristaByIdController {
  async handle(request: Request, response: Response) {
    const id: number = +request.params.id;

    const service = new GetMotoristaByIdService();
    const result = await service.execute(id);

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
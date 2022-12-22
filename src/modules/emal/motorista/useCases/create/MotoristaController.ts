import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { MotoristaService } from "./MotoristaService";

export class MotoristaController {
  async insert(request: Request, response: Response) {
    const motorista = request.body;

    const service = new MotoristaService();
    const result = await service.insert(motorista);

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }

  async update(request: Request, response: Response) {
    const id: number = +request.params.id;
    const motorista = request.body;

    const service = new MotoristaService();
    const result = await service.update(id, motorista);

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
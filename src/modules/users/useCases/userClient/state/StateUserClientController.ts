import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { StateUserClientService } from "./StateUserClientService";

export class StateUserClientController {
  async handle(request: Request, response: Response) {
    const id: number = +request.params.id;
    const { state } = request.body;
    
    const service = new StateUserClientService();
    const result = await service.execute({ id, state });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { CreateUserClientService } from "./CreateUserClientService";

export class CreateUserClientController {
  async handle(request: Request, response: Response) {
    const { user_id, client_id, state } = request.body;

    const service = new CreateUserClientService();
    const result = service.execute({ user_id, client_id, state });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
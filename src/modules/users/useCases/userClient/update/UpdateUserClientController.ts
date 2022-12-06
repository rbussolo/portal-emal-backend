import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { UpdateUserClientService } from "./UpdateUserClientService";

export class UpdateUserClientController {
  async handle(request: Request, response: Response) {
    const user_id: number = +request.params.user_id;

    const service = new UpdateUserClientService();
    const result = service.execute(user_id);

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
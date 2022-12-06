import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { ListUserClientService } from "./ListUserClientService";

export class ListUserClientController {
  async handle(request: Request, response: Response) {
    const user_id: number = parseInt(request.params.user_id);
    
    const service = new ListUserClientService();
    const result = await service.execute(user_id);

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
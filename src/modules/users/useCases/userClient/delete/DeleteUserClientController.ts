import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { DeleteUserClientService } from "./DeleteUserClientService";

export class DeleteUserClientController {
  async handle(request: Request, response: Response) {
    const id: number = +request.params.id;

    const service = new DeleteUserClientService();
    const result = service.execute(id);

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json({ success: result });
  }
}
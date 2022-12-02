import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { GetUserByIdService } from "./GetUserByIdService";

export class GetUserByIdController {
  async handle(request: Request, response: Response) {
    const id: number = +request.params.id;

    const service = new GetUserByIdService();
    const result = await service.execute(id);

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
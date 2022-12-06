import { ResetCheckService } from './ResetCheckService';
import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";

export class ResetCheckController {
  async handle(request: Request, response: Response){
    const token = request.params.token;

    const service = new ResetCheckService();
    const result = await service.execute({ token });
    
    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
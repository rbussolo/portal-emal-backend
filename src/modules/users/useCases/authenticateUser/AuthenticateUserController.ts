import { Request, Response } from "express";

import { AppError } from "../../../../errors/AppError";
import { AuthenticateUserService } from "./AuthenticateUserService";

export class AuthenticateUserController {
  async handle(request: Request, response: Response){
    const { email, password } = request.body;

    const service = new AuthenticateUserService();
    const result = await service.execute({ email, password });

    if(result instanceof AppError) {
      return response.status(result.statusCode).json(result);
    }

    return response.json(result);
  }
}
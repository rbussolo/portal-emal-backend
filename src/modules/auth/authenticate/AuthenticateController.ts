import { Request, Response } from "express";

import { AppError } from "../../../errors/AppError";
import { AuthenticateService } from "./AuthenticateService";

export class AuthenticateController {
  async handle(request: Request, response: Response){
    const { email, password } = request.body;

    const service = new AuthenticateService();
    const result = await service.execute({ email, password });

    if(result instanceof AppError) {
      return response.status(result.statusCode).json({ code: result.code, message: result.message });
    }

    return response.json(result);
  }
}
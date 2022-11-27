import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { RefreshTokenService } from "./RefreshTokenService";

export class RefreshTokenController {
  async handle(request: Request, response: Response){
    const { token } = request.body;

    if (!token) {
      return response.status(400).json({ message: "Token is missing" });
    }

    const service = new RefreshTokenService();
    const result = await service.execute(token);

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ code: result.code, message: result.message });
    }

    return response.json(result);
  }
}
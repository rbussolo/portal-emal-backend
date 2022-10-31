import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { RefreshTokenService } from "./RefreshTokenService";

export class RefreshTokenController {
  async handle(request: Request, response: Response){
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({ message: "Token missing" });
    }

    const [, token] = authHeader.split(" ");

    const service = new RefreshTokenService();
    const result = await service.execute(token);

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
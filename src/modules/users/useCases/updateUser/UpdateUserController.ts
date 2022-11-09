import { Request, Response } from "express";

import { AppError } from "../../../../errors/AppError";
import { UserType } from "../../entities/UserType";
import { UpdateUserService } from "./UpdateUserService";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const id: number = +request.params.id;
    const { name, cpf_cnpj, cellphone } = request.body;

    // Check if it user can edit this user;
    if(request.user.id != id && request.user.type == UserType.Client){
      return response.status(400).json({ message: "Você não tem permissão para fazer esta operação!" });
    }

    const service = new UpdateUserService();
    const result = await service.execute({ id, name, cpf_cnpj, cellphone });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
import { Request, Response } from "express";

import { ListUserService } from './ListUserService';

export class ListUserController {
  async handle(request: Request, response: Response){
    const { page, amount, name, email, type } = request.query;

    const service = new ListUserService();
    const result = await service.execute({ page, amount, name, email, type });

    return response.json(result);
  }
}
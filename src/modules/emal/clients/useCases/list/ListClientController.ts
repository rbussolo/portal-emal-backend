import { Request, Response } from "express";
import { ListClientService } from "./ListClientService";

export class ListClientController {
  async handle(request: Request, response: Response) {
    const { page, amount, name, cpfCnpj } = request.query;

    const service = new ListClientService();
    const result = await service.execute({ page, amount, name, cpfCnpj });

    return response.json(result);
  }
}
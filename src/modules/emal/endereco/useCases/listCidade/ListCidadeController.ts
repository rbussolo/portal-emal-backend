import { Request, Response } from "express";
import { ListCidadeService } from "./ListCidadeService";

export class ListCidadeController {
  async handle(request: Request, response: Response) {
    const id: number = +request.params.id;

    const service = new ListCidadeService();
    const result = await service.execute(id);

    return response.json(result);
  }
}
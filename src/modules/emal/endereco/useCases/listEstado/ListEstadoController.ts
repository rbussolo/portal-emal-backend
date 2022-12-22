import { Request, Response } from "express";
import { ListEstadoService } from "./ListEstadoService";

export class ListEstadoController {
  async handle(request: Request, response: Response) {
    const service = new ListEstadoService();
    const result = await service.execute();

    return response.json(result);
  }
}
import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { ListPedidoService } from "./ListPedidoService";

export class ListPedidoController {
  async handle(request: Request, response: Response) {
    const { page, amount, pedDataInicial, pedDataFinal, pedCli, pedNum, pedEmp, pedFil, estqCod } = request.query;

    const service = new ListPedidoService();
    const result = await service.execute({ page, amount, pedDataInicial, pedDataFinal, pedCli, pedNum, pedEmp, pedFil, estqCod });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
import { ListMotoristaRequest, ListMotoristaService } from './ListMotoristaService';
import { Request, Response } from "express";
import { queryParamToInt } from "../../../../../utils/QueryParams";

export class ListMotoristaController {
  async handle(request: Request, response: Response) {
    const { page, amount, MOTCPF, MOTNOME, MOTCIDADE } = request.query;
    const filters: ListMotoristaRequest = {
      page: queryParamToInt(page),
      amount: queryParamToInt(amount),
      MOTCPF: MOTCPF as string,
      MOTNOME: MOTNOME as string,
      MOTCIDADE: queryParamToInt(MOTCIDADE)
    }

    const service = new ListMotoristaService();
    const result = await service.execute(filters);

    return response.json(result);
  }
}
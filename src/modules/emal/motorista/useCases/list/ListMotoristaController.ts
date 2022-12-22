import { ListMotoristaRequest, ListMotoristaService } from './ListMotoristaService';
import { Request, Response } from "express";
import { queryParamToInt } from "../../../../../utils/QueryParams";

export class ListMotoristaController {
  async handle(request: Request, response: Response) {
    const { page, amount, MOTCPF, MOTNOME, CIDCOD, ESTCOD } = request.query;
    const filters: ListMotoristaRequest = {
      page: queryParamToInt(page),
      amount: queryParamToInt(amount),
      MOTCPF: MOTCPF as string,
      MOTNOME: MOTNOME as string,
      CIDCOD: queryParamToInt(CIDCOD),
      ESTCOD: queryParamToInt(ESTCOD)
    }

    const service = new ListMotoristaService();
    const result = await service.execute(filters);

    return response.json(result);
  }
}
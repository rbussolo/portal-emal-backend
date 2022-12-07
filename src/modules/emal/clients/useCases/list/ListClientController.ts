import { Request, Response } from "express";
import { queryParamToInt } from "../../../../../utils/QueryParams";
import { ListClientRequest, ListClientService } from "./ListClientService";

export class ListClientController {
  async handle(request: Request, response: Response) {
    const { page, amount, cod, name, cpfCnpj } = request.query;
    const filters: ListClientRequest = {
      page: queryParamToInt(page),
      amount: queryParamToInt(amount),
      cod: queryParamToInt(cod),
      name: name as string,
      cpfCnpj: cpfCnpj as string
    }

    const service = new ListClientService();
    const result = await service.execute(filters);

    return response.json(result);
  }
}
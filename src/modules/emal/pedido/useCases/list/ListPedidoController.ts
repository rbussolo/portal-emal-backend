import { Request, Response } from "express";
import { AppError } from "../../../../../errors/AppError";
import { queryParamToBoolean, queryParamToDate, queryParamToInt } from "../../../../../utils/QueryParams";
import { ListPedidoProps, ListPedidoService } from "./ListPedidoService";



export class ListPedidoController {
  async handle(request: Request, response: Response) {
    const { page, amount, pedDataInicial, pedDataFinal, pedCli, pedNum, pedEmp, pedFil, estqCod, pedNobres, pedCuiaba, pedAcucar, pedItaipu, pedCamil } = request.query;

    const filters: ListPedidoProps = {
      page: queryParamToInt(page),
      amount: queryParamToInt(amount),
      pedDataInicial: queryParamToDate(pedDataInicial),
      pedDataFinal: queryParamToDate(pedDataFinal),
      pedCli: queryParamToInt(pedCli),
      pedNum: queryParamToInt(pedNum),
      pedEmp: queryParamToInt(pedEmp),
      pedFil: queryParamToInt(pedFil),
      estqCod: queryParamToInt(estqCod),
      pedNobres: queryParamToBoolean(pedNobres),
      pedCuiaba: queryParamToBoolean(pedCuiaba),
      pedAcucar: queryParamToBoolean(pedAcucar),
      pedItaipu: queryParamToBoolean(pedItaipu),
      pedCamil: queryParamToBoolean(pedCamil)
    }

    const service = new ListPedidoService();
    const result = await service.execute(filters);

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.json(result);
  }
}
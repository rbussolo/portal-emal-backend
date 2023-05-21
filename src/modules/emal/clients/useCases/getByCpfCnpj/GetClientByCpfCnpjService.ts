import { EmalDataSource } from "../../../../../data-source-emal";
import { AppError } from "../../../../../errors/AppError";
import { maskCpfCnpj } from "../../../../../utils/AdicionaMaskCpfCnpj";
import { validCpfCnpj } from "../../../../../utils/ValidCpfCnpj";
import { EmalCliente } from "../../entities/EmalCliente";

interface ClientResponse {
  CLICOD: number;
  CLICNPJCPF: string;
  CLINOME: string;
}

export class GetClientByCpfCnpjService {
  async execute(cpf_cnpj: string): Promise<ClientResponse | AppError> {
    if (!cpf_cnpj) return new AppError("É necessário informar o CPF/CNPJ!");
    if (!validCpfCnpj(cpf_cnpj)) return new AppError("O CPF/CNPJ esta inválido!");

    // No banco de dados esta salvo com mascara
    cpf_cnpj = maskCpfCnpj(cpf_cnpj);

    const repo = EmalDataSource.getRepository(EmalCliente);
    const result = await repo.find({ where: { CLICNPJCPF: cpf_cnpj }, relations: ['CIDADE'] });

    if (!result) {
      return new AppError("Não foi localizado nenhum registro com este CPF/CNPJ!");
    }

    const client: ClientResponse = result[0];

    return client;
  }
}
import { EmalDataSource } from "../../../../../data-source-emal";
import { AppError } from "../../../../../errors/AppError";
import { validCnpj } from "../../../../../utils/ValidCnpj";
import { EmalFornecedor } from "../../entities/EmalFornecedor";

interface ForgetEmail {
  cpf_cnpj: string;
}

interface ForgetEmailResponse {
  email: string;
}

export class ForgetEmailService {
  async execute({ cpf_cnpj }: ForgetEmail): Promise<ForgetEmailResponse | AppError> {
    if (!cpf_cnpj) return new AppError("É necessário informar o CNPJ!");
    if (!validCnpj(cpf_cnpj)) return new AppError("O CNPJ esta inválido!");

    const repo = EmalDataSource.getRepository(EmalFornecedor);
    const result = await repo.find({ where: { FORCNPJCPF: cpf_cnpj } });

    if (result.length == 0) {
      return new AppError("Não foi localizado nenhum registro com este CNPJ!");
    }

    return { email: result[0].FOREMAIL };
  }
}
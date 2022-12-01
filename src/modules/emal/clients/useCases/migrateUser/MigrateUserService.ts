import { EmalDataSource } from "../../../../../data-source-emal";
import { AppError } from "../../../../../errors/AppError";
import { EmalFornecedor } from "../../entities/EmalFornecedor";
import { Smtp } from "../../../../emails/Smtp";
import { Auth } from "../../../../auth/Auth";


interface MigrateUser {
  cpf_cnpj: string;
  email: string;
}

export class MigrateUserService {
  async execute({ cpf_cnpj, email }: MigrateUser): Promise<EmalFornecedor | AppError> {
    if (!cpf_cnpj) {
      return new AppError("É necessário informar o CPF/CNPJ!");
    } else if (!email) {
      return new AppError("É necessário informar o E-mail!");
    }

    const repo = EmalDataSource.getRepository(EmalFornecedor);
    const result = await repo.find({ where: { FORCNPJCPF: cpf_cnpj, FOREMAIL: email }});

    if (result.length == 0) {
      return new AppError("Cliente não localizado!");
    }

    const token = Auth.generateMigrateUserToken({ cpf_cnpj, email });

    let emailContent = Smtp.loadTemplate('newUser.html');
    emailContent = emailContent.replace("#TOKEN_MIGRATE_USER#", token);

    Smtp.sendEmail({
      recipient: email,
      subject: "Criação de conta - Portal Atendimento",
      content: emailContent
    });

    return result[0];
  }
}
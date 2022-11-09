import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { Auth } from "../../../auth/Auth";
import { Smtp } from "../../../emails/smtp";
import { User } from "../../entities/User";

interface ForgotPassword {
  email: string;
  cpf_cnpj: string;
}

export class ForgotPasswordService {
  async execute({ email, cpf_cnpj }: ForgotPassword): Promise<AppError> {
    if (!email) {
      return new AppError("É necessário informar o E-mail!");
    } else if(!cpf_cnpj) {
      return new AppError("É necessário informar o CPF/CNPJ!");
    }

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { email, cpf_cnpj }});

    if (!user) {
      return new AppError("Não foi localizado nenhuma conta com os dados informados!");
    }

    const token = Auth.generateResetPasswordToken(user.id);

    let emailContent = Smtp.loadTemplate('forgotPassword.html');
    emailContent = emailContent.replace("#TOKEN_RESET_PASSWORD#", token);
    
    Smtp.sendEmail({
      recipient: email,
      subject: "Alteração de senha - Portal Atendimento",
      content: emailContent
    });
  }
}
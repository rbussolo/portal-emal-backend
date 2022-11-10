import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { Auth } from "../../../auth/Auth";
import { Token } from "../../../tokens/entities/Token";
import { User } from "../../entities/User";

interface ResetCheck {
  token: string;
}

export class ResetCheckService {
  async execute({ token }: ResetCheck): Promise<AppError | User>{
    if (!token) {
      return new AppError("É necessário informar o Token!");
    }

    const decoded = Auth.validResetPasswordToken(token);

    if (decoded instanceof AppError) {
      return decoded;
    }

    const repo = AppDataSource.getRepository(Token);
    const tokenExist = await repo.findOne({ where: { token } });

    if (tokenExist) {
      return new AppError("Token já foi utilizado!");
    }

    const repoUser = AppDataSource.getRepository(User);
    const user = await repoUser.findOne({ where: { id: decoded.user_id }, select: ["cpf_cnpj", "name", "email"]});

    if(!user) {
      return new AppError("Usuário não foi encontrado!");
    }

    return user;
  }
}
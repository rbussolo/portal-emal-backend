import { compare } from "bcryptjs";

import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors/AppError";
import { User } from "../../users/entities/User";
import { Auth, Tokens } from "../Auth";

interface AuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateService {
  async execute({ email, password }: AuthenticateRequest): Promise<Tokens | AppError>{
    if(!email || !password){
      return new AppError("É necessário informar o E-mail / Senha!");
    }

    const repo = AppDataSource.getRepository(User);

    // Check if user exists
    const user = await repo.findOne({ where: { email }});

    if(!user){
      return new AppError("E-mail / senha incorretos!");
    }

    // Check if password is correct
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      return new AppError("E-mail / senha incorretos!");
    }

    const tokens = Auth.generateTokens({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf_cnpj: user.cpf_cnpj,
      cellphone: user.cellphone,
      type: user.type
    });

    return tokens;
  }
}
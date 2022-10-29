import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

interface Token {
  user: {
    name: string;
    email: string;
    cpf_cnpj: string;
    type: string;
  };
  token: string;
}

export class AuthenticateUserService {
  async execute({ email, password }: AuthenticateUserRequest): Promise<Token | AppError>{
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

    // Generate JWT
    const token = sign({}, "24176e3fc59c20fba3764d244f7f7324", {
      subject: user.id.toString()
    });

    const tokenReturn: Token = {
      user: {
        name: user.name,
        email: user.email,
        cpf_cnpj: user.cpf_cnpj,
        type: user.type
      },
      token: token
    }

    return tokenReturn;
  }
}
import { hash } from "bcryptjs";

import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { PasswordError } from "../../../../errors/PasswordError";
import { validPassword } from "../../../../utils/ValidPassword";
import { Auth } from "../../../auth/Auth";
import { Token } from "../../../tokens/entities/Token";
import { User } from "../../entities/User";

interface ResetPassword {
  token: string;
  password: string;
}

export class ResetPasswordService {
  async execute({ token, password }: ResetPassword): Promise<AppError | PasswordError>{
    if (!token) {
      return new AppError("É necessário informar o Token!");
    }

    const decoded = Auth.validResetPasswordToken(token);

    if (decoded instanceof AppError) {
      return decoded;
    }

    const passwordValid = validPassword(password);

    if (!passwordValid.valid) {
      return new PasswordError("A senha não esta no padrão necessário!", passwordValid.messages);
    }

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id: decoded.user_id } });

    if (!user) {
      return new AppError("Usuário não localizado!");
    }

    // Generate password
    const passwordHash = await hash(password, 8);

    user.password = passwordHash;

    await repo.save(user);

    // Create a new token
    const repoToken = AppDataSource.getRepository(Token);

    const tokenInsert = repoToken.create({
      token
    });

    await repoToken.save(tokenInsert);
  }
}
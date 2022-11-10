import { hash } from "bcryptjs";
import { AppDataSource } from "../../../../../data-source";
import { EmalDataSource } from "../../../../../data-source-emal";
import { AppError } from "../../../../../errors/AppError";
import { PasswordError } from "../../../../../errors/PasswordError";
import { removeMaskCpfCnpj } from "../../../../../utils/RemoveMaskCpfCnpj";
import { validPassword } from "../../../../../utils/ValidPassword";
import { Auth } from "../../../../auth/Auth";
import { User } from "../../../../users/entities/User";
import { UserType } from "../../../../users/entities/UserType";
import { EmalClient } from "../../entities/EmalClient";

interface NewPassword {
  token: string;
  password: string;
}

export class NewPasswordService {
  async execute({ token, password }: NewPassword): Promise<AppError | PasswordError | User>{
    if (!token) {
      return new AppError("É necessário informar o Token!");
    }

    const decoded = Auth.validMigrateUserToken(token);

    if (decoded instanceof AppError) {
      return decoded;
    }

    const passwordValid = validPassword(password);

    if (!passwordValid.valid) {
      return new PasswordError("A Senha informada é inválida!", passwordValid.messages);
    }

    const repo = AppDataSource.getRepository(User);
    const userExists = await repo.findOne({ where: { email: decoded.email } });

    if (userExists) {
      return new AppError("Já existe um usuário para o E-mail informado!");
    }

    const repoClient = EmalDataSource.getRepository(EmalClient);
    const result = await repoClient.find({ where: { FORCNPJCPF: decoded.cpf_cnpj, FOREMAIL: decoded.email } });

    if (result.length == 0) {
      return new AppError("Não foi localizado os dados deste cliente!");
    }

    const client = result[0];

    // Generate password
    const passwordHash = await hash(password, 8);

    const user = repo.create({
      email: client.FOREMAIL,
      password: passwordHash,
      name: client.FORNOME,
      cpf_cnpj: removeMaskCpfCnpj(client.FORCNPJCPF),
      cellphone: client.FORTELEFONE,
      type: UserType.Client
    });

    await repo.save(user);

    return user;
  }
}
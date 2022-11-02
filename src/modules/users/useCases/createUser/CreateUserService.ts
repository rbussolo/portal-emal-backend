import { hash } from "bcryptjs";

import { AppError } from './../../../../errors/AppError';
import { AppDataSource } from "../../../../data-source";
import { User } from "../../entities/User";
import { validEmail } from '../../../../utils/ValidEmail';
import { validCpfCnpj } from "../../../../utils/ValidCpfCnpj";
import { removeMaskCpfCnpj } from "../../../../utils/RemoveMaskCpfCnpj";
import { validPassword } from "../../../../utils/ValidPassword";
import { PasswordError } from "../../../../errors/PasswordError";

interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  cpf_cnpj: string;
  cellphone?: string;
  type?: string;
}

export class CreateUserService {
  async execute({ email, password, name, cpf_cnpj, cellphone, type }: CreateUserRequest): Promise<User | AppError | PasswordError>{
    // Check everything that is necessary has informed
    if (!email) {
      return new AppError("É necessário informar o E-mail!");
    } else if (!password) {
      return new AppError("É necessário informar a Senha!");
    } else if (!name) {
      return new AppError("É necessário informar o Nome!");
    } else if (!cpf_cnpj) {
      return new AppError("É necessário informar o CPF/CNPJ!");
    } else if (!validEmail(email)) {
      return new AppError("O E-mail informado é inválido!");
    } else if (!validCpfCnpj(cpf_cnpj)) {
      return new AppError("O CPF/CNPJ informado é inválido!");
    } 
    
    const passwordValid = validPassword(password);

    if (!passwordValid.valid) {
      return new PasswordError("A Senha informada é inválida!", passwordValid.messages);
    }

    const repo = AppDataSource.getRepository(User);

    // Check if already has a user with this e-mail
    const userExists = await repo.findOne({ where: { email }});
    
    if(userExists){
      return new AppError("Já existe um usuário cadastrado com este e-mail.");
    }

    // Generate password
    const passwordHash = await hash(password, 8);

    const user = repo.create({
      email,
      password: passwordHash,
      name,
      cpf_cnpj: removeMaskCpfCnpj(cpf_cnpj),
      cellphone,
      type
    });

    await repo.save(user);

    return user;
  }
}
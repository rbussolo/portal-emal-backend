import { User } from '../../entities/User';
import { AppError } from '../../../../errors/AppError';
import { AppDataSource } from '../../../../data-source';
import { validCpfCnpj } from '../../../../utils/ValidCpfCnpj';
import { removeMaskCpfCnpj } from '../../../../utils/RemoveMaskCpfCnpj';

interface IUpdateUser {
  id: number;
  name: string;
  email?: string;
  cpf_cnpj: string;
  cellphone: string;
  type: string;
}

export class UpdateUserService {
  async execute({ id, email, name, cpf_cnpj, cellphone, type }: IUpdateUser): Promise<IUpdateUser | AppError> {
    if (!id) {
      return new AppError("É necessário informar o Id do usuário!");
    } else if(cpf_cnpj && !validCpfCnpj(cpf_cnpj)) {
      return new AppError("O CPF/CNPJ informado é inválido!");
    }

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id }});

    if (!user) {
      return new AppError("Usuário não localizado!");
    }

    user.name = name ? name.toUpperCase() : user.name;
    user.cpf_cnpj = cpf_cnpj ? removeMaskCpfCnpj(cpf_cnpj) : user.cpf_cnpj;
    user.cellphone = cellphone ? cellphone : user.cellphone;
    user.email = email ? email : user.email;
    user.type = type ? type : user.type;

    await repo.save(user);

    const userReturn: IUpdateUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf_cnpj: user.cpf_cnpj,
      cellphone: user.cellphone,
      type: user.type
    }

    return userReturn;
  }
}
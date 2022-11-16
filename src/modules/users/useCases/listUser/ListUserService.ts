import { AppDataSource } from "../../../../data-source";
import { validPagination } from "../../../../utils/ValidPagination";
import { User } from "../../entities/User";

interface ListUserRequest {
  page: number;
  amount: number;
  name: string;
  email: string;
  type: string;
}

interface Users {
  users: User[];
  count: number;
}

export class ListUserService {
  async execute({ page, amount, name, email, type }): Promise<Users> {
    const pagination = validPagination({ page, amount });
    const repo = AppDataSource.getRepository(User);

    let query = repo.createQueryBuilder("users").select("users.id").addSelect("users.name").addSelect("users.email").addSelect("users.cpf_cnpj").addSelect("users.type").addSelect("users.cellphone");

    if(name) {
      query = query.andWhere("users.name like :name", { name: `${name}%` });
    }

    if (email) {
      query = query.andWhere("users.email like :email", { email: `${email}%` });
    }

    if (type) {
      query = query.andWhere("users.type = :type", { type });
    }

    query = query.offset(pagination.offset);
    query = query.limit(pagination.amount);

    const users = await query.getMany();
    const count = await query.getCount();

    return { users, count };
  }
}
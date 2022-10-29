import { AppDataSource } from "../../../../data-source";
import { validPagination } from "../../../../utils/ValidPagination";
import { User } from "../../entities/User";

interface ListUserRequest {
  page: number;
  amount: number;
  name: string;
}

interface Users {
  users: User[];
  count: number;
}

export class ListUserService {
  async execute({ page, amount, name }): Promise<Users> {
    const pagination = validPagination({ page, amount });
    const repo = AppDataSource.getRepository(User);

    let query = repo.createQueryBuilder("users").select("users.id").addSelect("users.name").addSelect("users.email").addSelect("users.cpf_cnpj").addSelect("users.type").addSelect("users.cellphone");

    if(name) {
      query = query.andWhere("users.name like :name", { name: `%${name}%` });
    }

    query = query.offset(pagination.offset);
    query = query.limit(pagination.amount);

    const users = await query.getMany();
    const count = await query.getCount();

    return { users, count };
  }
}
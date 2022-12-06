import { AppDataSource } from "../../../../../data-source";
import { AppError } from "../../../../../errors/AppError";
import { UserClient } from "../../../entities/UserClient";

export class ListUserClientService {
  async execute(user_id: number): Promise<AppError | UserClient[]>{
    if (!user_id) {
      return new AppError("É necessário informar o ID do usuário!");
    }

    const repo = AppDataSource.getRepository(UserClient);
    const user_clients = await repo.find({ where: { user_id }});

    return user_clients;
  }
}
import { AppDataSource } from "../../../../../data-source";
import { AppError } from "../../../../../errors/AppError";
import { UserClient } from "../../../entities/UserClient";

export class DeleteUserClientService {
  async execute(id: number): Promise<AppError | boolean> {
    if (!id) {
      return new AppError("É necessário informar o ID do usuário cliente!");
    }

    const repo = AppDataSource.getRepository(UserClient);
    const result = await repo.delete({ id });

    if (result.affected) {
      return true;
    }

    return new AppError("Registro não localizado!");
  }
}
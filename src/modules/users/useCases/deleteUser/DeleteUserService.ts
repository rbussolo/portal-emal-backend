import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";

export class DeleteUserService {
  async execute(id: number): Promise<AppError | boolean> {
    if (!id) {
      return new AppError("É necessário informar o Id do usuário!");
    }

    const repo = AppDataSource.getRepository(User);
    const result = await repo.delete(id);

    if (result.affected) {
      return true;
    }
    
    return new AppError("Usuário não localizado!");
  }
}
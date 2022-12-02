import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";

export class GetUserByIdService {
  async execute(id: number): Promise<User | AppError> {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id } });

    if (!user) {
      return new AppError("Usuário não localizado!");
    }

    return user;
  }
}
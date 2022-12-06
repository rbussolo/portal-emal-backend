import { AppDataSource } from "../../../../../data-source";
import { AppError } from "../../../../../errors/AppError";
import { UserClient } from "../../../entities/UserClient";

interface StateUserClientProps {
  id: number;
  state: string;
}

export class StateUserClientService {
  async execute({ id, state}: StateUserClientProps) {
    const repo = AppDataSource.getRepository(UserClient);
    const result = await repo.find({ where: { id } });
    
    if (!result.length) {
      return new AppError("Registro não localizado!");
    }

    const userClient = result[0];
    userClient.state = state;

    await repo.save(userClient);

    return userClient;
  }
}
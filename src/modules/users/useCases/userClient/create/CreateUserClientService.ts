import { AppDataSource } from "../../../../../data-source";
import { EmalDataSource } from "../../../../../data-source-emal";
import { AppError } from "../../../../../errors/AppError";
import { EmalCliente } from "../../../../emal/clients/entities/EmalCliente";
import { UserClient } from "../../../entities/UserClient";

interface CreateUserClientProps {
  user_id: number;
  client_id: number;
  state?: string;
}

export class CreateUserClientService {
  async execute({ user_id, client_id, state }: CreateUserClientProps): Promise<AppError | UserClient>{
    if (!user_id) return new AppError("É necessário informar o Usuário!");
    if (!client_id) return new AppError("É necessário informar o Cliente!");
    
    const repo = AppDataSource.getRepository(UserClient);
    const userClientExists = await repo.find({ where: { client_id, user_id }});

    if (userClientExists.length) {
      return new AppError("Já existe vinculo deste usuário com este cliente!");
    }

    const repoClient = EmalDataSource.getRepository(EmalCliente);
    const resultClient = await repoClient.find({ where: { CLICOD: client_id } });

    if (!resultClient) {
      return new AppError("Cliente não localizado!")
    }

    const userClient = repo.create({
      user_id,
      client_id,
      client_cpf_cnpj: resultClient[0].CLICNPJCPF,
      client_name: resultClient[0].CLINOME,
      state
    });

    await repo.save(userClient);

    return userClient;
  }
}
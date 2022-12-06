import { In } from "typeorm/find-options/operator/In";
import { AppDataSource } from "../../../../../data-source";
import { EmalDataSource } from "../../../../../data-source-emal";
import { AppError } from "../../../../../errors/AppError";
import { EmalCliente } from "../../../../emal/clients/entities/EmalCliente";
import { UserClient } from "../../../entities/UserClient";

export class UpdateUserClientService {
  async execute(user_id: number): Promise<AppError | UserClient[]> {
    if (!user_id) {
      return new AppError("É necessário informar o ID do usuário!");
    }

    const repo = AppDataSource.getRepository(UserClient);
    const user_clients = await repo.find({ where: { user_id } });

    if (!user_clients.length) {
      return user_clients;
    }

    const clients_id = [];

    for (let i = 0; i < user_clients.length; i++) {
      clients_id.push(user_clients[i].client_id);
    }

    const repoClient = EmalDataSource.getRepository(EmalCliente);
    const resultClient = await repoClient.find({ where: { CLICOD: In(clients_id) } });

    for (let i = 0; i < resultClient.length; i++) {
      const client = resultClient[i];

      for (let j = 0; j < user_clients.length; j++) {
        const user_client = user_clients[j];

        if (user_client.client_id === client.CLICOD) {
          if (user_client.client_cpf_cnpj != client.CLICNPJCPF || user_client.client_name != client.CLINOME) {
            user_client.client_cpf_cnpj = client.CLICNPJCPF;
            user_client.client_name = client.CLINOME;

            await repo.save(user_client);
          }

          break;
        }
      }
    }

    return user_clients;
  }
}
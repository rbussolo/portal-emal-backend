import { EmalDataSource } from "../../../../../data-source-emal";
import { AppError } from "../../../../../errors/AppError";
import { EmalMotorista } from "../../entities/EmalMotorista";

export class GetMotoristaByIdService {
  async execute(id: number): Promise<EmalMotorista | AppError> {
    const repo = EmalDataSource.getRepository(EmalMotorista);
    const motorista = await repo.find({ where: { MOTCOD: id } });

    if (!motorista.length) {
      return new AppError("Usuário não localizado!");
    }

    return motorista[0];
  }
}

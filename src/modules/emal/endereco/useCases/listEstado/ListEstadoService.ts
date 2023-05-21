import { LessThanOrEqual } from "typeorm";
import { EmalDataSource } from "../../../../../data-source-emal";
import { EmalEstado } from "../../entities/EmalEstado";

export class ListEstadoService {
  async execute(): Promise<EmalEstado[]>{
    const repo = EmalDataSource.getRepository(EmalEstado);
    const estados = await repo.find({ 
      where: {
        ESTCOD: LessThanOrEqual(27)
      },
      order: {
        ESTNOME: {
          direction: "ASC"
        }
      }
    });

    return estados;
  }
}
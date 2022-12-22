import { EmalDataSource } from "../../../../../data-source-emal";
import { EmalCidade } from "../../entities/EmalCidade";

export class ListCidadeService {
  async execute(CIDEST: number): Promise<EmalCidade[]> {
    const repo = EmalDataSource.getRepository(EmalCidade);
    const cidades = await repo.find({ 
      where: { 
        CIDEST 
      }, 
      order: { 
        CIDNOME: { 
          direction: "ASC" 
        } 
      } 
    });

    return cidades;
  }
}
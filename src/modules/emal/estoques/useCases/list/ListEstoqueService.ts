import { AppError } from "../../../../../errors/AppError";
import { OracleDB } from "../../../../../utils/Oracle";
import { validPagination } from "../../../../../utils/ValidPagination";
import { EmalEstoque } from "../../entities/EmalEstoque";

interface Estoques {
  estoques: EmalEstoque[];
  count: number;
  countPerPage: number;
}

export class ListEstoqueService {
  async execute({ page, amount, cod, name }): Promise<Estoques | AppError> {
    const pagination = validPagination({ page, amount });

    let query = "select estqCod || '' as estqCod, estqNomeComp, estqApelido, estqNcm from sysdba.estoque where 1 = 1";
    let params = [];

    if (cod) {
      query += " and estqCod like :cod";
      params.push(cod);
    }

    if (name) {
      query += " and estqNomeComp like :name";
      params.push(name.toUpperCase() + '%');
    }

    // Realiza a contagem
    const count = await OracleDB.count(query, params);

    if (!count) {
      return new AppError("Não foi localizado nenhum registro!");
    }

    // Adicionado ordenação
    query += " ORDER BY estqNomeComp";

    // Carrega os dados
    const estoques: EmalEstoque[] = await OracleDB.pagination({ query, params, page: pagination.page, amount: pagination.amount });

    return { estoques, count, countPerPage: pagination.amount };
  }
}
import { EmalDataSource } from '../../../../../data-source-emal';
import { validPagination } from "../../../../../utils/ValidPagination";
import { EmalCliente } from "../../entities/EmalCliente";
import { OracleDB } from '../../../../../utils/Oracle';

interface ListClientRequest {
  page: number;
  amount: number;
  name: string;
  cpfCnpj: string;
}

interface Clients {
  clients: EmalCliente[];
  count: number;
  countPerPage: number;
}

export class ListClientService {
  async execute({ page, amount, name, cpfCnpj }): Promise<Clients> {
    const pagination = validPagination({ page, amount });

    let query = "select cliCod, cliNome, cliCnpjCpf, cliEmail from sysdba.cliente where 1 = 1";
    let params = [];

    if (name) {
      query += " and cliNome like :name";
      params.push(name.toUpperCase() + '%');
    }

    if (cpfCnpj) {
      query += " and cliCnpjCpf like :cpfCnpj";
      params.push(cpfCnpj);
    }

    // Realiza a contagem
    const count = await OracleDB.count(query, params);

    // Adicionado ordenação
    query += " ORDER BY cliNome";

    // Carrega os clientes
    const clients: EmalCliente[] = await OracleDB.pagination({ query, params, page: pagination.page, amount: pagination.amount });

    return { clients, count, countPerPage: pagination.amount };
  }
}
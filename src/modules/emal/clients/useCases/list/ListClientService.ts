import { EmalDataSource } from '../../../../../data-source-emal';
import { validPagination } from "../../../../../utils/ValidPagination";
import { EmalCliente } from "../../entities/EmalCliente";
import { OracleDB } from '../../../../../utils/Oracle';

export interface ListClientRequest {
  page: number;
  amount: number;
  cod: number;
  name: string;
  cpfCnpj: string;
}

interface Clients {
  clients: EmalCliente[];
  count: number;
  countPerPage: number;
}

export class ListClientService {
  async execute({ page, amount, cod, name, cpfCnpj }: ListClientRequest): Promise<Clients> {
    const pagination = validPagination({ page, amount });

    let query = "select cliCod, cliNome, cliCnpjCpf, cliEmail from sysdba.cliente c where 1 = 1";
    let params = [];

    if (cod) {
      query += " and cliCod = :cod";
      params.push(cod);
    }

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
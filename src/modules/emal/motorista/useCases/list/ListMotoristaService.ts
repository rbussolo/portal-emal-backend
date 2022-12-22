import { OracleDB } from "../../../../../utils/Oracle";
import { validPagination } from "../../../../../utils/ValidPagination";

export interface ListMotoristaRequest {
  page?: number;
  amount?: number;
  MOTCOD?: number;
  MOTNOME?: string;
  MOTCIDADE?: number;
}

interface Motorista {
  MOTCOD: number;
  MOTNOME: string;
  MOTCPF: string;
  MOTTELEFONE: string;
  MOTCELULAR: string;
  CIDCOD: number;
  CIDNOME: string;
}

interface Motoristas {
  clients: Motorista[];
  count: number;
  countPerPage: number;
}

export class ListMotoristaService {
  async execute({ page, amount, MOTCOD, MOTNOME, MOTCIDADE }: ListMotoristaRequest): Promise<Motoristas> {
    const pagination = validPagination({ page, amount });

    let query = "select motCod, motNome, motCpf, motTelefone, motCelular, cidCod, cidNome from sysdba.motorista m inner join sysdba.cidade c on c.cidCod = m.motCidade where 1 = 1";
    let params = [];

    if (MOTCOD && MOTCOD > 0) {
      query += " and motCod = :motCod";
      params.push(MOTCOD);
    }

    if (MOTNOME && MOTNOME.length > 0) {
      query += " and motNome like :motNome";
      params.push(MOTNOME.toUpperCase() + '%');
    }

    if (MOTCIDADE && MOTCIDADE > 0) {
      query += " and motCidade = :motCidade";
      params.push(MOTCIDADE);
    }

    // Realiza a contagem
    const count = await OracleDB.count(query, params);

    // Adicionado ordenação
    query += " ORDER BY motNome";

    // Carrega os clientes
    const clients: Motorista[] = await OracleDB.pagination({ query, params, page: pagination.page, amount: pagination.amount });

    return { clients, count, countPerPage: pagination.amount };
  }
}


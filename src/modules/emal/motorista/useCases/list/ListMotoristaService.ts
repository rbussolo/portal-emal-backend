import { OracleDB } from "../../../../../utils/Oracle";
import { validPagination } from "../../../../../utils/ValidPagination";

export interface ListMotoristaRequest {
  page?: number;
  amount?: number;
  MOTCPF?: string;
  MOTNOME?: string;
  CIDCOD?: number;
  ESTCOD?: number;
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
  motorista: Motorista[];
  count: number;
  countPerPage: number;
}

export class ListMotoristaService {
  async execute({ page, amount, MOTCPF, MOTNOME, CIDCOD, ESTCOD }: ListMotoristaRequest): Promise<Motoristas> {
    const pagination = validPagination({ page, amount });

    let query = "select motCod, motNome, motCpf, motTelefone, motCelular, cidCod, cidNome from sysdba.motorista m inner join sysdba.cidade c on c.cidCod = m.motCidade where 1 = 1";
    let params = [];

    if (MOTCPF) {
      query += " and motCpf = :motCpf";
      params.push(MOTCPF);
    }

    if (MOTNOME && MOTNOME.length > 0) {
      query += " and motNome like :motNome";
      params.push(MOTNOME.toUpperCase() + '%');
    }

    if (CIDCOD && CIDCOD > 0) {
      query += " and cidCod = :cidCod";
      params.push(CIDCOD);
    }

    if (ESTCOD && ESTCOD > 0) {
      query += " and cidEst = :cidEst";
      params.push(ESTCOD);
    }

    // Realiza a contagem
    const count = await OracleDB.count(query, params);

    // Adicionado ordenação
    query += " ORDER BY motNome";

    // Carrega os clientes
    const motorista: Motorista[] = await OracleDB.pagination({ query, params, page: pagination.page, amount: pagination.amount });

    return { motorista, count, countPerPage: pagination.amount };
  }
}


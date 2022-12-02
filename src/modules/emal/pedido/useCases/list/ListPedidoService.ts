import { AppError } from "../../../../../errors/AppError";
import { OracleDB } from "../../../../../utils/Oracle";
import { validPagination } from "../../../../../utils/ValidPagination";

interface Pedido {
  PEDNUM: number;
  PEDDATA: Date;
  CLICOD: number;
  CLICNPJCPF: string;
  CLINOME: string;
  PEDSIT: number;
  UNIDADE: string;
  EMPCOD: number;
  EMPSIGLA: string;
  FILCOD: number;
  FILIAL: string;
  ESTQCOD: number;
  ESTQNOME: string;
  IPEDNUM: number;
  IPEDQUANT: number;
  IPEDPESOTOT: number;
  IPEDUNIT: number;
  IPEDQUANTDESP: number;
  IPEDQUANTCANC: number;
  PEDPESOTOT: number;
  PEDTOTALBRUTO: number;
}

interface Pedidos {
  pedidos: Pedido[];
  count: number;
  countPerPage: number;
}

export class ListPedidoService {
  async execute({ page, amount, pedDataInicial, pedDataFinal, pedCli, pedNum, pedEmp, pedFil, estqCod }): Promise<Pedidos | AppError> {
    const pagination = validPagination({ page, amount });

    let params = [];
    let query = `
    SELECT 
      p.pedNum, p.pedData, c.cliCod, c.cliCnpjCpf, c.cliNome, p.pedSit,
      vu.unidade, vu.empCod, vu.empSigla, vu.filCod, vu.filial, p.pedPesoTot, p.pedTotalBruto
    FROM sysdba.pedido p
    INNER JOIN sysdba.cliente c ON c.cliCod = p.pedCli
    INNER JOIN sysdba.view_unidades vu ON vu.empCod = p.pedEmp AND vu.filCod = p.pedFil
    WHERE 1 = 1
    `;

    if (pedDataInicial) {
      query += " and pedData >= :pedDataInicial";
      params.push(pedDataInicial);
    }

    if (pedDataFinal) {
      query += " and pedData <= :pedDataFinal";
      params.push(pedDataFinal);
    }

    if (pedCli && pedCli > 0) {
      query += " and pedCli = :pedCli";
      params.push(pedCli);
    }

    if (pedNum && pedNum > 0) {
      query += " and pedNum = :pedNum";
      params.push(pedNum);
    }

    if (pedEmp && pedEmp > 0) {
      query += " and pedEmp = :pedEmp";
      params.push(pedEmp);
    }

    if (pedFil && pedFil > 0) {
      query += " and pedFil = :pedFil";
      params.push(pedFil);
    }

    if (estqCod && estqCod > 0) {
      query += " and pedNum in (SELECT ip.ipedNum FROM sysdba.itemPedido ip WHERE ip.ipedEstq = :estqCod)";
      params.push(estqCod);
    }

    // Realiza a contagem
    const count = await OracleDB.count(query, params);

    if (!count) {
      return new AppError("Não foi localizado nenhum registro!");
    }

    // Adicionado ordenação
    query += " ORDER BY p.pedNum DESC";

    // Carrega o sql com a paginação
    query = OracleDB.paginationSql({ query, page: pagination.page, amount: pagination.amount });

    // Agora adiciona o agrupamento de informação
    query = `
      SELECT
        x.pedNum, x.pedData, x.cliCod, x.cliCnpjCpf, x.cliNome, x.pedSit, x.unidade, x.empCod,
        x.empSigla, x.filCod, x.filial, x.pedPesoTot, x.pedTotalBruto, ip.ipedNum, ip.ipedQuant,
        ip.ipedPesoTot, ip.ipedUnit, ip.ipedQuantDesp, ip.ipedQuantCanc, e.estqCod, e.estqNome
      FROM ( 
        SELECT 
          x.*,
          (SELECT min(ip.ipedNum) FROM sysdba.itemPedido ip WHERE ip.ipedPed = x.pedNum) as min_ipedNum
        FROM (${query}) x 
      ) x
      LEFT JOIN sysdba.itemPedido ip ON ip.ipedNum = x.min_ipedNum 
      LEFT JOIN sysdba.estoque e ON e.estqCod = ip.ipedEstq`;

    // Carrega os dados
    const pedidos: Pedido[] = await OracleDB.pagination({ query, params, page: pagination.page, amount: pagination.amount });

    return { pedidos, count, countPerPage: pagination.amount };
  }
}
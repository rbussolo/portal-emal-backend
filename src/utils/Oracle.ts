import { EmalDataSource } from "../data-source-emal";

interface CountResult {
  COUNT: number;
}

interface PaginationProps {
  query: string;
  params?: any[];
  page: number;
  amount: number;
}

interface ExecuteProps {
  query: string;
  params?: any[];
}

const OracleDB = {
  execute: async({ query, params }: ExecuteProps): Promise<any> => {
    const result = await EmalDataSource.query(query, params);

    return result;
  },
  pagination: async ({ query, params, page, amount }: PaginationProps): Promise<any> => {
    const max = page * amount;
    const skip = (page - 1) * amount;
    const queryPagination = 'SELECT x.* FROM (SELECT x.*, rownum as rnum FROM (' + query + ') x WHERE rownum <= ' + max + ') x WHERE rnum > ' + skip;
    const result = await EmalDataSource.query(queryPagination, params);

    return result;
  },
  count: async (query: string, params?: any[]): Promise<number> => {
    const queryCount = 'SELECT count(1) as count FROM (' + query + ') x';
    const result: CountResult[] = await EmalDataSource.query(queryCount, params);

    return result[0].COUNT;
  },
  paginationSql: ({ query, page, amount }: PaginationProps): string => {
    const max = page * amount;
    const skip = (page - 1) * amount;
    const queryPagination = 'SELECT x.* FROM (SELECT x.*, rownum as rnum FROM (' + query + ') x WHERE rownum <= ' + max + ') x WHERE rnum > ' + skip;
    
    return queryPagination;
  }
}

export { OracleDB };
declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id: number;
      name: string;
      email: string;
      cpf_cnpj: string;
      cellphone: string;
      type: string;
    };
  }
}

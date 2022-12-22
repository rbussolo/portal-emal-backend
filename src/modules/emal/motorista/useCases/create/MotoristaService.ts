import { Not } from "typeorm";
import { EmalDataSource } from "../../../../../data-source-emal";
import { AppError } from "../../../../../errors/AppError";
import { validCpfCnpj } from "../../../../../utils/ValidCpfCnpj";
import { EmalMotorista } from "../../entities/EmalMotorista";

interface Motorista {
  MOTNOME: string;
  MOTCPF: string;
  MOTENDERECO: string;
  MOTBAIRRO: string;
  MOTCEP: string;
  MOTCIDADE: number;
  MOTTELEFONE: string;
  MOTCELULAR: string;
  MOTWHATSAPP: string;
  MOTCHAB: string;
  MOTCHABVENC: Date;
  MOTCHABCATEG: string;
  MOTDATANASC: Date;
  MOTPAI: string;
  MOTMAE: string;
}

export class MotoristaService {
  async check(motorista: Motorista, id?: number): Promise<string> {
    if (!motorista.MOTNOME) return "É necessário informar o Nome!";
    if (!motorista.MOTCPF) return "É necessário informar o CPF!";
    if (!validCpfCnpj(motorista.MOTCPF)) return "O CPF/CNPJ informado é inválido!";
    if (!motorista.MOTCELULAR) return "É necessário informar o Celular!";
    if (!motorista.MOTCEP) return "É necessário informar o CEP!";
    if (!motorista.MOTENDERECO) return "É necessário informar o Endereço!";
    if (!motorista.MOTBAIRRO) return "É necessário informar o Bairro!";
    if (!motorista.MOTCIDADE) return "É necessário informar a Cidade!";

    if (id) {
      // Check if exist other driver with same cpf
      const repo = EmalDataSource.getRepository(EmalMotorista);
      const m = await repo.find({ where: { MOTCPF: motorista.MOTCPF, MOTCOD: Not(id) } });

      if (m.length) {
        return "Já existe um cadastro com o CPF informado.";
      }
    }
  }

  async update(id: number, motorista: Motorista): Promise<EmalMotorista | AppError> {
    if (!id) return new AppError("É necessário informar o Id do Motorista!");

    const error = await this.check(motorista, id);

    if (error) {
      return new AppError(error);
    }

    const repo = EmalDataSource.getRepository(EmalMotorista);
    const motoristas = await repo.find({ where: { MOTCOD: id }});

    if (!motoristas.length) {
      return new AppError("Registro não localizado!");
    }

    const m: EmalMotorista = motorista[0];

    m.MOTNOME = motorista.MOTNOME;
    m.MOTCPF = motorista.MOTCPF;
    m.MOTENDERECO = motorista.MOTENDERECO;
    m.MOTBAIRRO = motorista.MOTBAIRRO;
    m.MOTCEP = motorista.MOTCEP;
    m.MOTCIDADE = motorista.MOTCIDADE;
    m.MOTTELEFONE = motorista.MOTTELEFONE;
    m.MOTCELULAR = motorista.MOTCELULAR;
    m.MOTWHATSAPP = motorista.MOTWHATSAPP;
    m.MOTCHAB = motorista.MOTCHAB;
    m.MOTCHABVENC = motorista.MOTCHABVENC;
    m.MOTCHABCATEG = motorista.MOTCHABCATEG;
    m.MOTDATANASC = motorista.MOTDATANASC;
    m.MOTPAI = motorista.MOTPAI;
    m.MOTMAE = motorista.MOTMAE;

    await repo.save(m);

    return m;
  }

  async insert(motorista: Motorista): Promise<EmalMotorista | AppError> {
    const error = await this.check(motorista);

    if (error) {
      return new AppError(error);
    }
    
    const repo = EmalDataSource.getRepository(EmalMotorista);

    const m = repo.create({
      ...motorista
    });

    await repo.save(m);

    return m;
  }
}

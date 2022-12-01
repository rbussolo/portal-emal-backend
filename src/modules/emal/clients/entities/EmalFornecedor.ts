import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("FORNECEDOR", { schema: "SYSDBA" })
export class EmalFornecedor {
  @PrimaryColumn()
  FORCOD: number;

  @Column()
  FORCNPJCPF: string;

  @Column()
  FORNOME: string;

  @Column()
  FORNOMEFANT: string;

  @Column()
  FOREMAIL: string;

  @Column()
  FORTELEFONE: string;

  @Column()
  FORENDERECO: string;

  @Column()
  FORENDERECONUM: string;

  @Column()
  FORENDERECOCOMP: string;

  @Column()
  FORBAIRRO: string;

  @Column()
  FORCEP: string;
}
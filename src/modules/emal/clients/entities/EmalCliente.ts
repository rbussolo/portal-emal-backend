import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("CLIENTE", { schema: "SYSDBA" })
export class EmalCliente {
  @PrimaryColumn()
  CLICOD: number;

  @Column()
  CLICNPJCPF: string;

  @Column()
  CLINOME: string;

  @Column()
  CLINOMEFANT: string;

  @Column()
  CLIEMAIL: string;

  @Column()
  CLIEMAILNFE: string;

  @Column()
  CLIENDERECO: string;

  @Column()
  CLIENDERECONUM: string;

  @Column()
  CLIENDERECOCOMP: string;

  @Column()
  CLIBAIRRO: string;

  @Column()
  CLICEP: string;

  @Column()
  CLICIDADE: number;

  @Column()
  CLICOBCEP: string;

  @Column()
  CLICOBCIDADE: string;
}
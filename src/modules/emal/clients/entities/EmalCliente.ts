import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("CLIENTE", { schema: "SYSDBA" })
export class EmalCliente {
  @PrimaryColumn()
  CLICOD: number;

  @Column()
  CLINOME: string;

  @Column()
  CLINOMEFANT: string;

  @Column()
  CLIENDERECO: string;

  @Column()
  CLIENDERECONUM: string;

  @Column()
  CLICOBCEP: string;

  @Column()
  CLICOBCIDADE: string;

  @Column()
  CLICNPJCPF: string;

  @Column()
  CLIEMAIL: string;

  @Column()
  CLIEMAILNFE: string;
}
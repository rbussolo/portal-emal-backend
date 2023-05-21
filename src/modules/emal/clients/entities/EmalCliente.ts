import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { EmalCidade } from "../../endereco/entities/EmalCidade";

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

  @ManyToOne(() => EmalCidade)
  @JoinColumn({ name: "CLICIDADE" })
  CIDADE: EmalCidade;

  @Column()
  CLICOBCEP: string;

  @Column()
  CLICOBCIDADE: string;
}
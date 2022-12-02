import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("ESTOQUE", { schema: "SYSDBA" })
export class EmalEstoque {
  @PrimaryColumn()
  ESTQCOD: number;

  @Column()
  ESTQNOMECOMP: string;

  @Column()
  ESTQAPELIDO: string;

  @Column()
  ESTQNCM: string;
}
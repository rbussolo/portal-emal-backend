import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("CIDADE", { schema: "SYSDBA" })
export class EmalCidade {
  @PrimaryColumn()
  CIDCOD: number;

  @Column()
  CIDNOME: string;

  @Column()
  CIDEST: string;

  @Column()
  CIDCODIBGE: string;

  @Column()
  CIDCEP: string;
}
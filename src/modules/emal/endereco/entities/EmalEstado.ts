import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("ESTADO", { schema: "SYSDBA" })
export class EmalEstado {
  @PrimaryColumn()
  ESTCOD: number;

  @Column()
  ESTNOME: string;

  @Column()
  ESTUF: string;
}
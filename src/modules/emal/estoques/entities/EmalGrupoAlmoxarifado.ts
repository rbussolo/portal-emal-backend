import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("GRUPOALMOXARIFADO", { schema: "SYSDBA" })
export class EmalEstoque {
  @PrimaryColumn()
  GALMCOD: number;

  @Column()
  GALMPRODVENDA: string;
}
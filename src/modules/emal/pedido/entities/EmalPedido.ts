import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("PEDIDO", { schema: "SYSDBA" })
export class EmalPedido {
  @PrimaryColumn()
  PEDNUM: number;

  @Column()
  PEDDATA: Date;

  @Column()
  PEDCLI: number;

  @Column()
  PEDSIT: number;

  @Column()
  PEDEMP: number;

  @Column()
  PEDFIL: number;

  @Column()
  PEDPESOTOT: number;

  @Column()
  PEDTOTALBRUTO: number;
}
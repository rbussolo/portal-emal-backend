import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { EmalCidade } from "../../cidade/entities/EmailCidade";

@Entity("MOTORISTA", { schema: "SYSDBA" })
export class EmalMotorista {
  @PrimaryColumn()
  MOTCOD: number;

  @Column()
  MOTNOME: string;

  @Column()
  MOTENDERECO: string;

  @Column()
  MOTBAIRRO: string;

  @Column()
  MOTCEP: string;

  @Column()
  MOTCIDADE: number;

  @ManyToOne(() => EmalCidade)
  @JoinColumn({ name: "MOTCIDADE" })
  CIDADE?: EmalCidade;

  @Column()
  MOTTELEFONE: string;

  @Column()
  MOTCELULAR: string;

  @Column()
  MOTCPF: string;

  @Column()
  MOTCHAB: string;

  @Column()
  MOTCHABVENC: Date;

  @Column()
  MOTCHABCATEG: string;
  
  @Column()
  MOTDATANASC: Date;

  @Column()
  MOTWHATSAPP: string;

  @Column()
  MOTPAI: string;

  @Column()
  MOTMAE: string;
}

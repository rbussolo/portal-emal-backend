import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { UserType } from "./UserType";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  cpf_cnpj: string;

  @Column({ nullable: true })
  cellphone: string;

  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.Client,
    nullable: true
  })
  type: string;

  @CreateDateColumn()
  created_at: string;
}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { UserClientState } from "./UserType";

@Entity("user_client")
export class UserClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  client_id: number;

  @Column()
  client_name: string;

  @Column()
  client_cpf_cnpj: string;

  @Column({
    type: "enum",
    enum: UserClientState,
    default: UserClientState.Required,
    nullable: true
  })
  state: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: string;
}
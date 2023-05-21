import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

export const EmailStatus = {
  WAITING: 'waiting',
  SENT: 'sent',
  FAILED: 'failed',
  CANCELED: 'canceled'
}

@Entity("emails")
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  from: string;

  @Column({ nullable: true })
  to: string;

  @Column({ nullable: true })
  subject: string;

  @Column({ nullable: true })
  content: string;

  @Column({
    type: "enum",
    enum: EmailStatus,
    default: EmailStatus.WAITING,
    nullable: true
  })
  status: string;

  @CreateDateColumn()
  created_at: string;
}

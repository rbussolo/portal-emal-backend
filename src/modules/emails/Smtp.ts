import { AppDataSource } from './../../data-source';
import fs from "fs";
import path from "path";

import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Email, EmailStatus } from './entities/Email';

interface EmailSender {
  recipient: string;
  subject: string;
  content: string;
}

interface EmailMessage {
  from: string;
  to: string;
  subject: string;
  content: string;
}

const from = '"Postal Atendimento" <rbussolo91@gmail.com>';

const smtpTransporterOption: SMTPTransport.Options = {
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'rbussolo91@gmail.com',
    pass: 'ufqbvjsrvuzjnnjh'
  }
}

function logEmail(message: EmailMessage, success: boolean) {
  const repo = AppDataSource.getRepository(Email);
  
  const email = repo.create({
    from: message.from,
    to: message.to,
    subject: message.subject,
    content: message.content,
    status: success ? EmailStatus.SENT : EmailStatus.FAILED
  });

  repo.save(email);
}

const Smtp = {
  loadTemplate: (relativePath: string): string => {
    const buffer = fs.readFileSync(path.resolve(__dirname, "./template/" + relativePath));
    const emailContent = buffer.toString();

    return emailContent;
  },

  sendEmail: ({ recipient, subject, content }: EmailSender) => {
    const transporter = nodemailer.createTransport(smtpTransporterOption);

    const email: EmailMessage = {
      from,
      to: recipient,
      subject,
      content
    }

    transporter.sendMail({
      from,
      to: recipient,
      subject,
      html: content
    }).then(() => logEmail(email, true)).catch(() => logEmail(email, false));
  }
}

export { Smtp };
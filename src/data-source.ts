import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_POSTGRES_HOST,
  port: parseInt(process.env.DATABASE_POSTGRES_PORT, 10),
  username: process.env.DATABASE_POSTGRES_USERNAME,
  password: process.env.DATABASE_POSTGRES_PASSWORD,
  database: process.env.DATABASE_POSTGRES_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["src/modules/users/entities/*.ts", "src/modules/emails/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
});

export const EmalDataSource = new DataSource({
  type: "oracle",
  username: process.env.DATABASE_EMAL_USERNAME,
  password: process.env.DATABASE_EMAL_PASSWORD,
  database: process.env.DATABASE_EMAL_DATABASE,
  host: process.env.DATABASE_EMAL_HOST,
  port: parseInt(process.env.DATABASE_EMAL_, 10),
  serviceName: process.env.DATABASE_EMAL_SERVICE,
  synchronize: false,
  logging: false,
  entities: ["src/modules/emal/clients/entities/*.ts"],
  migrations: [],
  subscribers: [],
});

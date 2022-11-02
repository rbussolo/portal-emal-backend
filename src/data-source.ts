import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "bussolo",
  database: "portal",
  synchronize: true,
  logging: false,
  entities: ["src/modules/users/entities/*.ts", "src/modules/emails/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
});

export const EmalDataSource = new DataSource({
  type: "oracle",
  username: "consultasti",
  password: "EMAL@2017",
  database: "ORCL",
  host: "10.0.0.79",
  port: 1521,
  serviceName: "ORCL",
  synchronize: false,
  logging: false,
  entities: ["src/modules/emal/clients/entities/*.ts"],
  migrations: [],
  subscribers: [],
})

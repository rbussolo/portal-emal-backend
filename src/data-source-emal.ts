import { DataSource } from "typeorm";

export const EmalDataSource = new DataSource({
  type: "oracle",
  username: process.env.DATABASE_EMAL_USERNAME,
  password: process.env.DATABASE_EMAL_PASSWORD,
  database: process.env.DATABASE_EMAL_DATABASE,
  host: process.env.DATABASE_EMAL_HOST,
  port: parseInt(process.env.DATABASE_EMAL_PORT, 10),
  serviceName: process.env.DATABASE_EMAL_SERVICE,
  synchronize: false,
  logging: false,
  entities: ["src/modules/emal/clients/entities/*.ts"],
  migrations: [],
  subscribers: [],
});
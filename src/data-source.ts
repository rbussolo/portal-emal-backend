import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: parseInt(process.env.DATABASE_POSTGRES_PORT, 10),
  username: "postgres",
  password: "bussolo",
  database: "portal",
  synchronize: true,
  logging: false,
  entities: ["src/modules/users/entities/*.ts", "src/modules/emails/entities/*.ts", "src/modules/tokens/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
});


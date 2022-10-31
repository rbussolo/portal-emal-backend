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
})

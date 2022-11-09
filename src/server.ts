import * as dotenv from 'dotenv'

// Inicia as variaveis de ambiente antes de tudo
dotenv.config();

import express from "express";
import cors from "cors";

import { AppDataSource, EmalDataSource } from "./data-source";
import { router } from "./routes";

AppDataSource.initialize();

if (process.env.DATABASE_EMAL_CONNECT != "NOT") {
  EmalDataSource.initialize();
}

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log("Servidor esta rodando na porta: " + port));

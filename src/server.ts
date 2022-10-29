import express, { NextFunction, Request, Response } from "express";

import { AppDataSource } from "./data-source";
import { AppError } from "./errors/AppError";
import { router } from "./routes";

AppDataSource.initialize();

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => console.log("Servidor esta rodando na porta: " + port));

import express from "express";

import { AppDataSource } from "./data-source";
import { router } from "./routes";

AppDataSource.initialize();

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => console.log("Servidor esta rodando na porta: " + port));

import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { authRoutes } from "./auth.routes";
import { clientsRoutes } from "./client.routes";
import { estoquesRoutes } from "./estoque.routes";
import { pedidosRoutes } from "./pedido.routes";
import { motoristasRoutes } from "./motorista.routes";
import { endereRoutes } from "./endereco.routes";

// const wrap = fn => (...args) => fn(...args).catch(args[2]);

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/clients", clientsRoutes);
router.use("/api/estoques", estoquesRoutes);
router.use("/api/pedidos", pedidosRoutes);
router.use("/api/motoristas", motoristasRoutes);
router.use("/api/endereco", endereRoutes);

export { router };


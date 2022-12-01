import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { authRoutes } from "./auth.routes";
import { clientsRoutes } from "./client.routes";

// const wrap = fn => (...args) => fn(...args).catch(args[2]);

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/clients", clientsRoutes);

export { router };


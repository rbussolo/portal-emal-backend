import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { authRoutes } from "./auth.routes";

// const wrap = fn => (...args) => fn(...args).catch(args[2]);

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/users", usersRoutes);

export { router };


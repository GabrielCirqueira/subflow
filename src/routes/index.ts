import { Router } from "express";
import usersRoutes from "../modules/users/users.routes";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
  res.json({
    status: "success",
    message: "API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Rotas de módulos
router.use("/users", usersRoutes);

export default router;

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import moment from "moment-timezone";
import { corsOptions } from "./config/cors";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import routes from "./routes";

// Carregar variáveis de ambiente
dotenv.config();

moment.tz.setDefault(process.env.TZ || "America/Sao_Paulo");

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    message: "SubFlow API 🚀",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
    timezone: moment.tz.guess(),
  });
});

app.use("/api", routes);

// Middleware para rotas não encontradas
app.use(notFoundHandler);

// Middleware de tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   🚀 SubFlow                               ║
║   Port: ${PORT}                            ║
║   Environment: ${process.env.NODE_ENV || "development"}            ║
║   Timezone: ${process.env.TZ || "America/Sao_Paulo"}   ║
╚════════════════════════════════════════════╝
  `);
});

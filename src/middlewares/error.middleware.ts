import type { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import {
  BaseError as SequelizeBaseError,
  ValidationError as SequelizeValidationError,
  UniqueConstraintError,
} from "sequelize";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { AppError } from "../types/errors";

interface ErrorResponse {
  status: "error";
  message: string;
  errors?: unknown[];
  stack?: string;
}

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  // 1. Erros customizados da aplicação
  if (error instanceof AppError) {
    const response: ErrorResponse = {
      status: "error",
      message: error.message,
    };

    if (isDevelopment && error.stack) {
      response.stack = error.stack;
    }

    return res.status(error.statusCode).json(response);
  }

  // 2. Erros de validação do Zod
  if (error instanceof ZodError) {
    const _validationError = fromZodError(error);
    const response: ErrorResponse = {
      status: "error",
      message: "Validation Error",
      errors: error.issues,
    };

    return res.status(400).json(response);
  }

  // 3. Erros do JWT
  if (error instanceof TokenExpiredError) {
    return res.status(401).json({
      status: "error",
      message: "Token expired",
    });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }

  // 4. Erros do Sequelize
  if (error instanceof UniqueConstraintError) {
    const field = Object.keys(error.fields || {})[0];
    return res.status(409).json({
      status: "error",
      message: `${field} already exists`,
    });
  }

  if (error instanceof SequelizeValidationError) {
    return res.status(400).json({
      status: "error",
      message: "Validation Error",
      errors: error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      })),
    });
  }

  if (error instanceof SequelizeBaseError) {
    return res.status(500).json({
      status: "error",
      message: "Database Error",
      ...(isDevelopment && { details: error.message }),
    });
  }

  // 5. Erros não tratados
  console.error("Unhandled Error:", error);

  const response: ErrorResponse = {
    status: "error",
    message: isDevelopment ? error.message : "Internal Server Error",
  };

  if (isDevelopment && error.stack) {
    response.stack = error.stack;
  }

  return res.status(500).json(response);
};

// Middleware para capturar erros assíncronos
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Middleware para rota não encontrada
export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  const error = new AppError("Route not found", 404);
  next(error);
};

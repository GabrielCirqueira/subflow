import { Router } from "express";
import { createUser, getUserById, getUsers } from "./users.controller";

const router = Router();

/**
 * @route   GET /api/users
 * @desc    Lista usuários com paginação e filtros
 * @query   page - Número da página (default: 1)
 * @query   limit - Itens por página (default: 10, max: 100)
 * @query   search - Busca por nome ou email
 * @query   status - Filtro por status (active, inactive, all)
 * @access  Public
 */
router.get("/", getUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Busca usuário por ID
 * @params  id - UUID ou número do usuário
 * @access  Public
 */
router.get("/:id", getUserById);

/**
 * @route   POST /api/users
 * @desc    Cria novo usuário
 * @body    name - Nome (min: 3, max: 100)
 * @body    email - Email válido
 * @body    age - Idade (opcional, min: 18)
 * @body    status - Status (active, inactive)
 * @access  Public
 */
router.post("/", createUser);

export default router;

import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { asyncHandler } from "../../middlewares/error.middleware";
import { NotFoundError } from "../../types/errors";
import type { CreateUserBody } from "./users.schema";
import { createUserBodySchema, getUserByIdParamsSchema, getUsersQuerySchema } from "./users.schema";

// Mock de dados
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  status: "active" | "inactive";
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    age: 25,
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@example.com",
    age: 30,
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro@example.com",
    age: 28,
    status: "inactive",
    createdAt: new Date().toISOString(),
  },
];

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const query = getUsersQuerySchema.parse(req.query);

  let filteredUsers = mockUsers;
  if (query.status !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.status === query.status);
  }

  if (query.search) {
    const searchLower = query.search.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower),
    );
  }

  const total = filteredUsers.length;
  const startIndex = (query.page - 1) * query.limit;
  const endIndex = startIndex + query.limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return res.json({
    status: "success",
    data: {
      users: paginatedUsers,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    },
  });
});

// GET /users/:id - Busca por ID
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const params = getUserByIdParamsSchema.parse(req.params);

  const user = mockUsers.find((u) => u.id === params.id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return res.json({
    status: "success",
    data: { user },
  });
});

// POST /users - Criar usuário (exemplo)
export const createUser = asyncHandler(
  async (req: Request<object, object, CreateUserBody>, res: Response) => {
    const body = createUserBodySchema.parse(req.body);

    const newUser: User = {
      id: uuidv4(),
      name: body.name,
      email: body.email,
      age: body.age,
      status: body.status,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: { user: newUser },
    });
  },
);

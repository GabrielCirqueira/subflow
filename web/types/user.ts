export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  status: "active" | "inactive";
  createdAt: string;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

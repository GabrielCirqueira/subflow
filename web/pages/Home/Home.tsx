import { Container, VStack, HStack, Grid, Box, Center } from "@/components/ui";
import { useState, useEffect } from "react";
import type { User, UsersResponse } from "@/types/user";
import { api } from "@/utils/api";

export function Component() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data: UsersResponse = await api.get("/api/users");
      setUsers(data.users);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-8">
        <Center className="min-h-[400px]">
          <p className="text-muted-foreground">Carregando...</p>
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8">
        <Center className="min-h-[400px]">
          <VStack spacing="4" align="center">
            <p className="text-destructive font-medium">Erro ao carregar usuários</p>
            <p className="text-sm text-muted-foreground">{error}</p>
            <button
              onClick={fetchUsers}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Tentar novamente
            </button>
          </VStack>
        </Center>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <VStack spacing="6">
        <HStack justify="between" align="center">
          <Box>
            <h1 className="text-3xl font-bold">Usuários</h1>
            <p className="text-muted-foreground">
              Gerencie os usuários do sistema
            </p>
          </Box>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Novo Usuário
          </button>
        </HStack>

        <Grid cols={1} gap="4" className="md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <Box
              key={user.id}
              className="p-6 border rounded-lg hover:shadow-md transition-shadow"
            >
              <VStack spacing="2">
                <HStack justify="between" align="start">
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${user.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {user.status === "active" ? "Ativo" : "Inativo"}
                  </span>
                </HStack>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {user.age && (
                  <p className="text-sm text-muted-foreground">
                    Idade: {user.age} anos
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Criado em: {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </VStack>
            </Box>
          ))}
        </Grid>

        {users.length === 0 && (
          <Center className="min-h-[200px]">
            <p className="text-muted-foreground">Nenhum usuário encontrado</p>
          </Center>
        )}
      </VStack>
    </Container>
  );
}

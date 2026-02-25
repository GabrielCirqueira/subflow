import { Container, HStack, Box, Spacer } from "@/components/ui";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background sticky top-0 z-50">
        <Container>
          <HStack className="h-16" justify="between" align="center">
            <Box>
              <h1 className="text-xl font-bold">SubFlow</h1>
              <p className="text-xs text-muted-foreground">
                Gestão de Assinaturas
              </p>
            </Box>
            <Spacer />
            <nav>
              <HStack spacing="4">
                <a
                  href="/"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Usuários
                </a>
              </HStack>
            </nav>
          </HStack>
        </Container>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-auto border-t bg-background py-6">
        <Container>
          <HStack justify="center" align="center">
            <p className="text-sm text-muted-foreground">
              © 2026 SubFlow. Sistema de Gestão de Assinaturas Pessoais.
            </p>
          </HStack>
        </Container>
      </footer>
    </div>
  );
}

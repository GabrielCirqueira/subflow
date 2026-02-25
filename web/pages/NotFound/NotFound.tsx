import { Container, VStack, Center } from "@/components/ui";
import { Link } from "react-router-dom";

export function Component() {
  return (
    <Container className="py-16">
      <Center className="min-h-[400px]">
        <VStack spacing="6" align="center">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Página não encontrada</h2>
          <p className="text-muted-foreground text-center max-w-md">
            A página que você está procurando não existe ou foi removida.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Voltar para Home
          </Link>
        </VStack>
      </Center>
    </Container>
  );
}

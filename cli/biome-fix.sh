#!/bin/bash

# Script de correção completa usando Biome
# Executa lint, format, organiza imports e aplica correções unsafe

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  🔧 Biome Fix - Correção Completa${NC}"
echo -e "${CYAN}════════════════════════════════════════════════${NC}"
echo ""

# Verifica se o Biome está instalado
if ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ npm não encontrado. Instale o Node.js primeiro.${NC}"
    exit 1
fi

# Passo 1: Verifica problemas
echo -e "${YELLOW}🔍 Passo 1/3: Verificando problemas...${NC}"
npx biome check src/ --diagnostic-level=warn

# Passo 2: Aplica correções seguras
echo ""
echo -e "${YELLOW}🔧 Passo 2/3: Aplicando correções seguras...${NC}"
npx biome check src/ --write

# Passo 3: Aplica correções unsafe (requer confirmação)
echo ""
echo -e "${YELLOW}⚠️  Passo 3/3: Aplicar correções unsafe?${NC}"
read -p "Isso pode modificar lógica do código. Continuar? (s/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Ss]$ ]]; then
    npx biome check src/ --write --unsafe
    echo -e "${GREEN}✅ Correções unsafe aplicadas!${NC}"
else
    echo -e "${YELLOW}⏭️  Correções unsafe ignoradas.${NC}"
fi

# Resultado final
echo ""
echo -e "${GREEN}════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ Correção completa finalizada!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}Próximos passos:${NC}"
echo "1. Revise as mudanças com: git diff"
echo "2. Teste a aplicação: make dev"
echo "3. Commit as mudanças: git add . && git commit"

#!/bin/bash

# Script para mostrar todos os comandos disponíveis (Make + CLI)

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${CYAN}════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  📚 Guia de Comandos - Node.js Backend Skeleton${NC}"
echo -e "${CYAN}════════════════════════════════════════════════${NC}"
echo ""

echo -e "${BLUE}🎯 COMANDOS MAKE (Recomendado)${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

make help 2>/dev/null || echo -e "${YELLOW}⚠️  Make não disponível. Instale: sudo apt install make${NC}"

echo ""
echo -e "${BLUE}🛠️  SCRIPTS CLI AVANÇADOS${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}./cli/biome-fix.sh${NC}       - Correção completa com Biome"
echo -e "${YELLOW}./cli/db-reset.sh${NC}        - Reset do banco de dados (⚠️  dev)"
echo -e "${YELLOW}./cli/env-switch.sh${NC}      - Troca entre ambientes"
echo -e "${YELLOW}./cli/project-stats.sh${NC}   - Estatísticas do projeto"
echo ""

echo -e "${BLUE}📦 NPM SCRIPTS${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}npm run dev${NC}              - Desenvolvimento com hot reload"
echo -e "${YELLOW}npm run build${NC}            - Build para produção"
echo -e "${YELLOW}npm start${NC}                - Iniciar versão buildada"
echo -e "${YELLOW}npm run lint${NC}             - Verificar código"
echo -e "${YELLOW}npm run lint:fix${NC}         - Corrigir problemas"
echo -e "${YELLOW}npm run format${NC}           - Formatar código"
echo -e "${YELLOW}npm run check${NC}            - Verificação completa"
echo ""

echo -e "${CYAN}════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  💡 Dica: Use 'make help' para ver todos os comandos${NC}"
echo -e "${CYAN}════════════════════════════════════════════════${NC}"

#!/bin/bash

# Script para resetar o banco de dados em ambiente de desenvolvimento
# ATENÇÃO: Este script apaga TODOS os dados do banco!

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${RED}════════════════════════════════════════════════${NC}"
echo -e "${RED}  ⚠️  RESET DO BANCO DE DADOS${NC}"
echo -e "${RED}════════════════════════════════════════════════${NC}"
echo ""

# Verifica o ambiente
if [ -f .env ]; then
    source .env
    if [ "$NODE_ENV" = "production" ]; then
        echo -e "${RED}❌ ERRO: Não é possível resetar banco em produção!${NC}"
        exit 1
    fi
fi

echo -e "${YELLOW}⚠️  ATENÇÃO: Isso irá:${NC}"
echo "  1. Desfazer todas as migrations"
echo "  2. Dropar todas as tabelas"
echo "  3. Recriar todas as tabelas"
echo "  4. Executar seeds (se existirem)"
echo ""
echo -e "${RED}Todos os dados serão PERDIDOS!${NC}"
echo ""
read -p "Tem certeza que deseja continuar? (digite 'SIM' para confirmar): " -r
echo ""

if [ "$REPLY" != "SIM" ]; then
    echo -e "${YELLOW}⏭️  Operação cancelada.${NC}"
    exit 0
fi

echo -e "${CYAN}🔄 Iniciando reset do banco de dados...${NC}"
echo ""

# Desfaz todas as migrations
echo -e "${YELLOW}⏪ Desfazendo migrations...${NC}"
npx sequelize-cli db:migrate:undo:all || true

# Executa todas as migrations novamente
echo -e "${YELLOW}🔄 Executando migrations...${NC}"
npx sequelize-cli db:migrate

# Executa seeds se existirem
if [ -d "src/database/seeders" ] && [ "$(ls -A src/database/seeders)" ]; then
    echo -e "${YELLOW}🌱 Executando seeds...${NC}"
    npx sequelize-cli db:seed:all
else
    echo -e "${CYAN}ℹ️  Nenhum seed encontrado para executar.${NC}"
fi

echo ""
echo -e "${GREEN}════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ Banco de dados resetado com sucesso!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════${NC}"

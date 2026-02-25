#!/bin/bash

# Script para trocar entre ambientes (development, production, test)

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

ENV=$1

if [ -z "$ENV" ]; then
    echo -e "${RED}❌ Erro: Ambiente não especificado${NC}"
    echo ""
    echo -e "${CYAN}Uso:${NC}"
    echo "  ./cli/env-switch.sh development"
    echo "  ./cli/env-switch.sh production"
    echo "  ./cli/env-switch.sh test"
    echo ""
    echo "Ou use o Makefile:"
    echo "  make env-switch env=development"
    exit 1
fi

case $ENV in
    development|dev)
        SOURCE_FILE=".env.development"
        ENV_NAME="Desenvolvimento"
        ;;
    production|prod)
        SOURCE_FILE=".env.production"
        ENV_NAME="Produção"
        ;;
    test)
        SOURCE_FILE=".env.test"
        ENV_NAME="Teste"
        ;;
    *)
        echo -e "${RED}❌ Ambiente inválido: $ENV${NC}"
        echo -e "${CYAN}Ambientes válidos: development, production, test${NC}"
        exit 1
        ;;
esac

if [ ! -f "$SOURCE_FILE" ]; then
    echo -e "${RED}❌ Arquivo $SOURCE_FILE não encontrado!${NC}"
    exit 1
fi

echo -e "${CYAN}════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  🔄 Trocando Ambiente${NC}"
echo -e "${CYAN}════════════════════════════════════════════════${NC}"
echo ""

# Backup do .env atual se existir
if [ -f .env ]; then
    BACKUP_FILE=".env.backup.$(date +%Y%m%d_%H%M%S)"
    cp .env "$BACKUP_FILE"
    echo -e "${YELLOW}💾 Backup criado: $BACKUP_FILE${NC}"
fi

# Copia o arquivo do ambiente
cp "$SOURCE_FILE" .env
echo -e "${GREEN}✅ Ambiente trocado para: $ENV_NAME${NC}"
echo ""

# Mostra informações do ambiente
echo -e "${CYAN}Configurações ativas:${NC}"
if command -v grep &> /dev/null; then
    echo -e "${YELLOW}NODE_ENV:${NC} $(grep "^NODE_ENV=" .env | cut -d '=' -f2)"
    echo -e "${YELLOW}PORT:${NC} $(grep "^PORT=" .env | cut -d '=' -f2)"
    echo -e "${YELLOW}DB_NAME:${NC} $(grep "^DB_NAME=" .env | cut -d '=' -f2)"
fi

echo ""
echo -e "${CYAN}Para iniciar o servidor:${NC}"
echo "  make dev  (ou npm run dev)"

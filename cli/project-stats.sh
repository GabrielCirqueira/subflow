#!/bin/bash

# Script para mostrar estatísticas do projeto

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m'

echo -e "${CYAN}════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  📊 Estatísticas do Projeto${NC}"
echo -e "${CYAN}════════════════════════════════════════════════${NC}"
echo ""

# Estatísticas de código TypeScript
if command -v find &> /dev/null && command -v wc &> /dev/null; then
    TS_FILES=$(find src -name "*.ts" 2>/dev/null | wc -l)
    TS_LINES=$(find src -name "*.ts" -exec cat {} \; 2>/dev/null | wc -l)
    
    echo -e "${BLUE}📝 Arquivos TypeScript:${NC}"
    echo -e "   Arquivos: ${GREEN}$TS_FILES${NC}"
    echo -e "   Linhas: ${GREEN}$TS_LINES${NC}"
    echo ""
fi

# Estatísticas de dependências
if [ -f package.json ] && command -v jq &> /dev/null; then
    DEPS=$(jq '.dependencies | length' package.json 2>/dev/null || echo "N/A")
    DEV_DEPS=$(jq '.devDependencies | length' package.json 2>/dev/null || echo "N/A")
    
    echo -e "${MAGENTA}📦 Dependências:${NC}"
    echo -e "   Produção: ${GREEN}$DEPS${NC}"
    echo -e "   Desenvolvimento: ${GREEN}$DEV_DEPS${NC}"
    echo ""
elif [ -f package.json ]; then
    echo -e "${MAGENTA}📦 Dependências:${NC}"
    echo -e "   ${YELLOW}(instale 'jq' para ver detalhes)${NC}"
    echo ""
fi

# Estrutura de pastas
if [ -d src ]; then
    echo -e "${YELLOW}📁 Estrutura do src/:${NC}"
    if command -v tree &> /dev/null; then
        tree src -L 2 -d --dirsfirst
    else
        ls -d src/*/ 2>/dev/null | sed 's|src/|   |'
    fi
    echo ""
fi

# Ambiente atual
if [ -f .env ]; then
    echo -e "${CYAN}🌍 Ambiente Atual:${NC}"
    if command -v grep &> /dev/null; then
        NODE_ENV=$(grep "^NODE_ENV=" .env | cut -d '=' -f2)
        PORT=$(grep "^PORT=" .env | cut -d '=' -f2)
        echo -e "   NODE_ENV: ${GREEN}$NODE_ENV${NC}"
        echo -e "   PORT: ${GREEN}$PORT${NC}"
    fi
    echo ""
fi

# Git
if command -v git &> /dev/null && [ -d .git ]; then
    echo -e "${GREEN}🔧 Git:${NC}"
    BRANCH=$(git branch --show-current 2>/dev/null || echo "N/A")
    COMMITS=$(git rev-list --count HEAD 2>/dev/null || echo "N/A")
    LAST_COMMIT=$(git log -1 --format="%ar" 2>/dev/null || echo "N/A")
    
    echo -e "   Branch: ${GREEN}$BRANCH${NC}"
    echo -e "   Commits: ${GREEN}$COMMITS${NC}"
    echo -e "   Último commit: ${GREEN}$LAST_COMMIT${NC}"
    echo ""
fi

# Tamanho do projeto
if command -v du &> /dev/null; then
    PROJECT_SIZE=$(du -sh . 2>/dev/null | cut -f1)
    NODE_MODULES_SIZE=$(du -sh node_modules 2>/dev/null | cut -f1 || echo "N/A")
    
    echo -e "${BLUE}💾 Tamanho:${NC}"
    echo -e "   Projeto total: ${GREEN}$PROJECT_SIZE${NC}"
    echo -e "   node_modules: ${YELLOW}$NODE_MODULES_SIZE${NC}"
    echo ""
fi

echo -e "${CYAN}════════════════════════════════════════════════${NC}"

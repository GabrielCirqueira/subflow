.PHONY: help install dev build start lint format check clean docker-up docker-down docker-logs test migrate migration seed

# Cores para output
GREEN  := \033[0;32m
YELLOW := \033[0;33m
CYAN   := \033[0;36m
NC     := \033[0m # No Color

help: ## Mostra este help
	@echo "${CYAN}════════════════════════════════════════════════${NC}"
	@echo "${CYAN}  🚀 SubFlow - Makefile${NC}"
	@echo "${CYAN}════════════════════════════════════════════════${NC}"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "${GREEN}%-20s${NC} %s\n", $$1, $$2}'
	@echo ""

install: ## Instala as dependências do projeto
	@echo "${YELLOW}📦 Instalando dependências...${NC}"
	npm install
	@echo "${GREEN}✅ Dependências instaladas!${NC}"

dev: ## Inicia o servidor em modo desenvolvimento
	@echo "${YELLOW}🚀 Iniciando servidor em modo desenvolvimento...${NC}"
	npm run dev

build: ## Compila o projeto TypeScript
	@echo "${YELLOW}🔨 Compilando TypeScript...${NC}"
	npm run build
	@echo "${GREEN}✅ Build completo!${NC}"

start: ## Inicia o servidor em modo produção
	@echo "${YELLOW}🚀 Iniciando servidor em modo produção...${NC}"
	npm start

lint: ## Verifica problemas no código
	@echo "${YELLOW}🔍 Verificando código...${NC}"
	npm run lint

lint-fix: ## Corrige problemas automaticamente
	@echo "${YELLOW}🔧 Corrigindo problemas...${NC}"
	npm run lint:fix
	@echo "${GREEN}✅ Problemas corrigidos!${NC}"

format: ## Formata o código
	@echo "${YELLOW}✨ Formatando código...${NC}"
	npm run format
	@echo "${GREEN}✅ Código formatado!${NC}"

check: ## Executa lint + format + organiza imports
	@echo "${YELLOW}🔍 Executando verificações completas...${NC}"
	npm run check
	@echo "${GREEN}✅ Verificações completas!${NC}"

clean: ## Remove node_modules e dist
	@echo "${YELLOW}🧹 Limpando projeto...${NC}"
	rm -rf node_modules dist
	@echo "${GREEN}✅ Projeto limpo!${NC}"

clean-all: clean ## Remove node_modules, dist e lock files
	@echo "${YELLOW}🧹 Limpeza profunda...${NC}"
	rm -rf package-lock.json
	@echo "${GREEN}✅ Limpeza profunda completa!${NC}"

docker-up: ## Sobe os containers Docker
	@echo "${YELLOW}🐳 Subindo containers Docker...${NC}"
	docker compose up -d
	@echo "${GREEN}✅ Containers rodando!${NC}"

docker-down: ## Para os containers Docker
	@echo "${YELLOW}🐳 Parando containers Docker...${NC}"
	docker compose down
	@echo "${GREEN}✅ Containers parados!${NC}"

docker-logs: ## Mostra os logs dos containers
	docker compose logs -f

docker-build: ## Reconstrói as imagens Docker
	@echo "${YELLOW}🐳 Reconstruindo imagens Docker...${NC}"
	docker compose up --build -d
	@echo "${GREEN}✅ Imagens reconstruídas!${NC}"

docker-restart: docker-down docker-up ## Reinicia os containers

migration: ## Cria uma nova migration (use name=nome_da_migration)
	@if [ -z "$(name)" ]; then \
		echo "${YELLOW}💡 Uso: make migration name=nome_da_migration${NC}"; \
		exit 1; \
	fi
	@echo "${YELLOW}📝 Criando migration $(name)...${NC}"
	npx sequelize-cli migration:generate --name $(name)
	@echo "${GREEN}✅ Migration criada!${NC}"

migrate: ## Executa as migrations pendentes
	@echo "${YELLOW}🔄 Executando migrations...${NC}"
	npx sequelize-cli db:migrate
	@echo "${GREEN}✅ Migrations executadas!${NC}"

migrate-undo: ## Desfaz a última migration
	@echo "${YELLOW}⏪ Desfazendo última migration...${NC}"
	npx sequelize-cli db:migrate:undo
	@echo "${GREEN}✅ Migration desfeita!${NC}"

seed: ## Cria um novo seed (use name=nome_do_seed)
	@if [ -z "$(name)" ]; then \
		echo "${YELLOW}💡 Uso: make seed name=nome_do_seed${NC}"; \
		exit 1; \
	fi
	@echo "${YELLOW}🌱 Criando seed $(name)...${NC}"
	npx sequelize-cli seed:generate --name $(name)
	@echo "${GREEN}✅ Seed criado!${NC}"

seed-all: ## Executa todos os seeds
	@echo "${YELLOW}🌱 Executando seeds...${NC}"
	npx sequelize-cli db:seed:all
	@echo "${GREEN}✅ Seeds executados!${NC}"

test: ## Executa os testes (quando implementado)
	@echo "${YELLOW}🧪 Executando testes...${NC}"
	@echo "${YELLOW}⚠️  Testes ainda não implementados${NC}"

setup: install ## Setup completo do projeto
	@echo "${YELLOW}⚙️  Executando setup completo...${NC}"
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "${GREEN}✅ Arquivo .env criado!${NC}"; \
	fi
	@echo "${GREEN}✅ Setup completo!${NC}"
	@echo ""
	@echo "${CYAN}Próximos passos:${NC}"
	@echo "1. Configure o arquivo .env"
	@echo "2. Execute: ${GREEN}make dev${NC}"

biome-fix: ## Executa script de correção completa do Biome
	@./cli/biome-fix.sh

db-reset: ## Reseta o banco de dados (desenvolvimento)
	@./cli/db-reset.sh

env-switch: ## Troca entre ambientes (use env=development|production|test)
	@./cli/env-switch.sh $(env)

project-stats: ## Mostra estatísticas do projeto
	@./cli/project-stats.sh

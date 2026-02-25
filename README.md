# 🏗️ SubFlow

> Sistema de Gestão de Assinaturas Pessoais

[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-GabrielCirqueira-blue.svg)](https://github.com/GabrielCirqueira)

---

## 📖 Sobre

Este é um **sistema profissional** para controle de assinaturas como Netflix, Spotify, AWS etc., com cálculo de gastos e alertas de vencimento. Ele já vem com toda a estrutura, configurações e boas práticas implementadas, permitindo que você **foque apenas na lógica de negócio** do seu projeto.

**✨ Perfeito para:** Controle de assinaturas recorrentes, gestão financeira pessoal, automação de pagamentos.

---

## 🎯 Por que usar este subflow?

❌ **Sem este subflow:**
- Configurar TypeScript, linter, formatter
- Setup de validação, erros, CORS, timezone
- Estruturar pastas e arquivos
- Configurar ambientes, Docker, commits semânticos
- 2-3 dias de setup inicial...

✅ **Com este subflow:**
- `git clone` + `npm install`
- Renomear projeto
- **Começar a codificar em minutos!** 🚀

---

## 📦 O que já está pronto?

### 🔧 Stack Completa

- **Runtime:** Node.js 20+
- **Linguagem:** TypeScript 5.9
- **Framework Web:** Express 5
- **ORM:** Sequelize + MySQL
- **Validação:** Zod + zod-validation-error
- **Autenticação:** JWT + bcryptjs (estrutura pronta)
- **Template Engine:** EJS
- **CORS:** Configurado com whitelist
- **Linter/Formatter:** Biome (format on save)
- **Commit Linting:** Commitlint + Husky
- **Timezone:** moment-timezone
- **Containerização:** Docker + Docker Compose

### 🏗️ Arquitetura Modular

```
src/
├── config/           ✅ Configurações (DB, CORS, JWT)
├── database/         ✅ Migrations, Models, Seeders
├── entities/         ✅ Entidades de domínio
├── jobs/             ✅ Jobs agendados (cron)
├── libs/             ✅ Bibliotecas auxiliares
├── middlewares/      ✅ Middlewares (error, auth, etc)
├── modules/          ✅ Módulos de negócio (exemplo: users)
├── routes/           ✅ Rotas centralizadas
├── templates/        ✅ Templates EJS
├── types/            ✅ Tipos TypeScript customizados
├── utils/            ✅ Funções utilitárias
├── main.ts           ✅ Entry point
└── protocols.ts      ✅ Interfaces compartilhadas
```

### ✨ Features Implementadas

- ✅ **Tratamento Global de Erros** - Centralizado e padronizado
  - Erros Zod (validação)
  - Erros JWT (auth)
  - Erros Sequelize (database)
  - Erros customizados (NotFoundError, BadRequestError, etc)

- ✅ **Validação Robusta** - Zod schemas com tipagem TypeScript

- ✅ **Ambientes Separados** - `.env.development`, `.env.production`, `.env.test`

- ✅ **CORS Configurado** - Whitelist de origens via env

- ✅ **Timezone Global** - America/Sao_Paulo (configurável)

- ✅ **Commits Semânticos** - Commitlint para padrão `feat:`, `fix:`, etc

- ✅ **Linting Automático** - Biome com format on save (CTRL+S)

- ✅ **Docker Ready** - Docker Compose com MySQL

- ✅ **Exemplo Completo** - Módulo Users com CRUD sem banco

---

## 🚀 Como usar este subflow

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/GabrielCirqueira/subflow.git meu-novo-projeto
cd meu-novo-projeto
```

### 2️⃣ Remova o git original e inicie seu próprio

```bash
rm -rf .git
git init
git add .
git commit -m "feat: initial commit from subflow"
```

### 3️⃣ Personalize o projeto

**Edite o `package.json`:**
```json
{
  "name": "meu-projeto",
  "description": "Minha aplicação incrível",
  "author": "Seu Nome"
}
```

**Edite os arquivos `.env*`:**
```bash
DB_NAME=meu_banco
# ... outras configurações
```

### 4️⃣ Setup automático (Recomendado!)

```bash
make setup
# Ou: npm install && cp .env.example .env
```

### 5️⃣ Inicie o desenvolvimento

```bash
make dev
# Ou: npm run dev
```

🎉 **Pronto!** API rodando em `http://localhost:3000`

---

## 📝 Scripts Disponíveis

### NPM Scripts

```bash
# Desenvolvimento
npm run dev              # Inicia com hot reload

# Build
npm run build            # Compila TypeScript

# Produção
npm start                # Inicia versão compilada

# Code Quality
npm run lint             # Verifica problemas
npm run lint:fix         # Corrige problemas
npm run format           # Formata código
npm run check            # Lint + Format + Organize imports
```

### 🎯 Makefile (Recomendado!)

O projeto inclui um **Makefile** com atalhos úteis:

```bash
# Ver todos os comandos disponíveis
make help

# Desenvolvimento
make install             # Instala dependências
make dev                 # Inicia servidor em dev
make setup               # Setup completo (install + .env)

# Build & Produção
make build               # Compila TypeScript
make start               # Inicia em produção

# Code Quality
make lint                # Verifica código
make lint-fix            # Corrige problemas
make format              # Formata código
make check               # Verificação completa
make biome-fix           # Correção completa com Biome

# Database
make migrate             # Executa migrations
make migrate-undo        # Desfaz última migration
make migration name=xxx  # Cria nova migration
make seed name=xxx       # Cria novo seed
make seed-all            # Executa todos seeds
make db-reset            # Reseta banco (⚠️ desenvolvimento)

# Docker
make docker-up           # Sobe containers
make docker-down         # Para containers
make docker-logs         # Mostra logs
make docker-build        # Reconstrói imagens
make docker-restart      # Reinicia containers

# Utilities
make env-switch env=xxx  # Troca ambiente (dev/prod/test)
make project-stats       # Estatísticas do projeto
make clean               # Remove node_modules e dist
make clean-all           # Limpeza profunda
```

### 🛠️ Scripts CLI Avançados

Em `cli/` você encontra scripts shell para tarefas complexas:

```bash
# Correção completa com Biome (safe + unsafe)
./cli/biome-fix.sh
make biome-fix

# Reset do banco de dados (⚠️ APAGA TUDO!)
./cli/db-reset.sh
make db-reset

# Troca de ambiente
./cli/env-switch.sh development
make env-switch env=production

# Estatísticas do projeto
./cli/project-stats.sh
make project-stats
```

**Todos os scripts em `cli/` são executáveis e coloridos!** 🎨

---

## 🗂️ Estrutura de Módulos

Cada módulo segue o padrão:

```
modules/users/
├── users.schema.ts      # Validações Zod
├── users.controller.ts  # Lógica de negócio
├── users.routes.ts      # Rotas Express
└── users.model.ts       # (opcional) Model Sequelize
```

**Para criar um novo módulo:**

1. Copie a pasta `modules/users`
2. Renomeie para seu módulo (ex: `products`)
3. Adapte schemas, controllers e routes
4. Registre no `routes/index.ts`

---

## 🔒 Variáveis de Ambiente

```env
# Ambiente
NODE_ENV=development

# Servidor
PORT=3000

# Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database
DB_USER=root
DB_PASSWORD=root

# JWT
JWT_SECRET=change_me_in_production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Timezone
TZ=America/Sao_Paulo
```

---

## 🧪 Testando a API

Após iniciar (`npm run dev`):

```bash
# Health check
curl http://localhost:3000/api/health

# Listar usuários (exemplo)
curl http://localhost:3000/api/users

# Ver documentação completa
# Abra: API_EXAMPLES.md
```

---

## 🎯 Próximos Passos Após Clonar

1. **Renomeie o projeto** no `package.json`
2. **Configure `.env`** com suas credenciais
3. **Delete o módulo `users`** (é apenas exemplo)
4. **Crie seus próprios módulos** de negócio
5. **Configure autenticação** (estrutura já pronta)
6. **Crie models Sequelize** para seu banco
7. **Adicione testes** (estrutura pronta para Jest/Vitest)

---

## 🌟 Features Extras

### Commits Semânticos

O projeto usa commitlint. Use:

```bash
git commit -m "feat: adiciona rota de login"
git commit -m "fix: corrige validação de email"
git commit -m "docs: atualiza README"
```

**Tipos:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`

### Format on Save

O VS Code já está configurado para formatar ao salvar (CTRL+S):
- Organiza imports
- Aplica style guide
- Corrige problemas simples

### Tratamento de Erros

Use as classes prontas:

```typescript
import { NotFoundError, BadRequestError } from './types/errors';

throw new NotFoundError('User not found');
throw new BadRequestError('Invalid email');
```

Todos os erros são capturados e formatados automaticamente.

---

## 📚 Documentação Adicional

- [`API_EXAMPLES.md`](API_EXAMPLES.md) - Exemplos de uso da API
- [`QUICK_START.md`](QUICK_START.md) - Guia rápido de teste
- [`CLI_DOCUMENTATION.md`](CLI_DOCUMENTATION.md) - Documentação dos scripts CLI
- [`commitlint.config.js`](commitlint.config.js) - Configuração de commits

---

## 🐳 Docker

```bash
# Subir aplicação + MySQL
docker compose up -d

# Ver logs
docker compose logs -f app

# Parar
docker compose down
```

---

## 🤝 Contribuindo

Este subflow é open source! Melhorias são bem-vindas:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/amazing`)
3. Commit suas mudanças (`git commit -m 'feat: add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing`)
5. Abra um Pull Request

---

## 📄 Licença

MIT License - Use livremente em projetos pessoais e comerciais.

Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🎁 Créditos

SubFlow criado por [Gabriel Cirqueira](https://github.com/GabrielCirqueira) com ❤️ para acelerar o desenvolvimento de projetos Node.js.

**Stack:** Node.js, TypeScript, Express, Sequelize, Zod, Biome, Docker

**Ferramentas de Desenvolvimento:** Makefile, Shell Scripts, Husky, Commitlint

---

## 💡 Dicas

- 📖 Leia [`API_EXAMPLES.md`](API_EXAMPLES.md) para exemplos práticos
- 🧪 Execute [`QUICK_START.md`](QUICK_START.md) para testar tudo
- 🔧 Customize [`biome.json`](biome.json) para seu style guide
- 🐳 Use Docker para evitar problemas de ambiente
- 🎯 Mantenha a estrutura modular para facilitar manutenção

---

**⚡ Comece a desenvolver em minutos, não em dias!**

Para dúvidas ou sugestões, abra uma [issue](https://github.com/GabrielCirqueira/subflow/issues).

**GitHub:** https://github.com/GabrielCirqueira

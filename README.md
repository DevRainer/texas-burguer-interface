# 🍔 Texas Burguer

Aplicação web de delivery de hambúrgueres desenvolvida para simular uma experiência completa de e-commerce gastronômico, com catálogo de produtos, carrinho de compras, checkout, autenticação e painel administrativo.

> Projeto desenvolvido como parte de estudos em desenvolvimento fullstack, com foco em experiência do usuário, organização de componentes e integração com serviços de pagamento e gestão de pedidos.

---

## 📌 Visão Geral

O Texas Burguer é uma interface moderna para um sistema de delivery, permitindo que o cliente:

- visualize produtos por categorias;
- adicione e remova itens do carrinho;
- acompanhe o resumo do pedido;
- finalize a compra com checkout;
- faça login ou cadastro;
- acesse áreas administrativas para gerenciar produtos e pedidos.

A aplicação foi construída com React e Vite, com foco em uma navegação simples e em uma interface amigável para o usuário final.

---

## ✨ Funcionalidades

### Cliente

- Catálogo de produtos e categorias
- Carrinho de compras com atualização dinâmica
- Tela de checkout
- Fluxo de pagamento integrado com Stripe
- Autenticação de usuário
- Finalização de pedido com confirmação

### Administração

- Dashboard de gestão de produtos
- Cadastro de novos itens
- Edição de produtos existentes
- Visualização e acompanhamento de pedidos
- Controle de status dos pedidos

---

## 🛠️ Tecnologias Utilizadas

- React 19
- Vite
- React Router DOM
- Axios
- Styled Components
- Material UI
- React Hook Form + Yup
- Stripe (frontend)
- ESLint + Prettier

---

## 🚀 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- Node.js 18 ou superior
- npm ou yarn
- Git

Se a aplicação for usada junto ao backend, também será necessário:

- backend em execução na porta 3001
- banco de dados configurado conforme a API do projeto

---

## ▶️ Como Executar

### 1. Clone o repositório

```bash
git clone https://github.com/DevRainer/texas-burguer-interface.git
cd texas-burguer-interface
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie a aplicação

```bash
npm run dev
```

A aplicação ficará disponível em:

```bash
http://localhost:5173
```

> O frontend está configurado para consumir a API em `http://localhost:3001/`. Certifique-se de que o backend correspondente esteja rodando antes de testar fluxos que envolvem autenticação, carrinho e pedidos.

---

## 🔐 Usuários de Teste

Abaixo estão alguns dados de acesso usados no projeto para testes locais:

### Administrador

- Email: `rainer@gmail.com`
- Senha: `123456`

### Usuário comum

- Email: `paulo@gmail.com`
- Senha: `123456`

---

## 📁 Estrutura do Projeto

```text
texas-burguer-interface/
├── public/                  # Arquivos públicos e estáticos
├── src/
│   ├── assets/              # Imagens e recursos visuais
│   ├── components/          # Componentes reutilizáveis
│   ├── config/              # Configurações do projeto
│   ├── containers/          # Páginas e telas da aplicação
│   ├── contexts/            # Contextos globais
│   ├── hooks/               # Hooks personalizados
│   ├── layouts/             # Layouts de navegação
│   ├── providers/           # Providers da aplicação
│   ├── router/              # Configuração de rotas
│   ├── services/            # Integração com APIs
│   ├── styles/              # Temas e estilos globais
│   ├── utils/               # Funções utilitárias
│   ├── main.jsx             # Ponto de entrada da aplicação
│   └── App.jsx              # Componente principal
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
└── TODO.md
```

---

## 🌐 Rotas Principais

- `/` — página inicial
- `/cardapio` — menu do restaurante
- `/carrinho` — resumo dos itens adicionados
- `/checkout` — finalização da compra
- `/login` — autenticação do usuário
- `/cadastro` — cadastro de novo cliente
- `/admin/produtos` — gestão de produtos
- `/admin/pedidos` — acompanhamento de pedidos

---

## 🧩 Observações do Projeto

Este repositório representa a parte frontend da solução de delivery. A interface foi organizada em componentes reutilizáveis, com separação clara entre páginas, layouts e serviços, o que facilita manutenção, evolução e reutilização do código.

A aplicação também conta com autenticação baseada em dados armazenados localmente e integração com serviços externos como Stripe para o fluxo de pagamento.

---

## 🤝 Contribuição

Contribuições são bem-vindas. Para colaborar:

```bash
git checkout -b minha-feature
git commit -m "feat: adiciona nova funcionalidade"
git push origin minha-feature
```

Depois, abra um Pull Request para revisão.

---

## 👨‍💻 Autor

Desenvolvido por Rainer como parte do curso Fullstack Pro da DevClube.

---

## 📝 Observação

Este README foi pensado para servir como guia de apresentação e execução do projeto, oferecendo uma visão clara da aplicação, suas funcionalidades e como iniciar o ambiente local de desenvolvimento.

# 🛍️ Montink Test

Este é um projeto desenvolvido com [Next.js](https://nextjs.org), iniciado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 🚀 Tecnologias Utilizadas

- **Next.js** (App Router)
- **React** (v18+)
- **TypeScript**
- **Tailwind CSS** (estilização)
- **Framer Motion** (animações)
- **React Icons** (ícones)
- **ESLint** e **Prettier** (padronização de código)
- **ViaCEP API** (consulta de CEP)
- **next/image** (otimização de imagens)

---

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/montink-test.git
cd montink-test
npm install
# ou
yarn
```

---

## ▶️ Como rodar o projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

## 🗂️ Estrutura de Páginas

- **Home (`/`)**  
  Exibe uma lista de produtos mockados, com cards interativos, busca e navegação.

- **Página de Produto Único (`/[product]`)**  
  Exibe detalhes do produto selecionado, galeria de imagens, seleção de cor/tamanho, consulta de CEP (com armazenamento temporário na sessão) e botões de ação.

---

## 📚 Bibliotecas & Funcionalidades

- **Tailwind CSS:** Utilizado para estilização rápida e responsiva.
- **Framer Motion:** Animações suaves em botões, imagens e transições.
- **React Icons:** Ícones de carrinho, coração, usuário, etc.
- **ViaCEP:** Consulta de endereço a partir do CEP digitado.
- **Session Storage com expiração:** Informações de CEP, cor e tamanho ficam salvas por 15 minutos para melhor UX.
- **next/image:** Otimização automática das imagens dos produtos.

---

## 📝 Observações

- O projeto utiliza dados mockados para os produtos.
- Não há backend ou persistência real de dados.
- O layout é responsivo e adaptado para mobile e desktop.

---

## 💡 Dicas

- Para alterar os produtos, edite o arquivo em `src/app/mock/mockProducts.ts`.
- Para customizar estilos, edite o arquivo `tailwind.config.js` ou os próprios componentes.

---

## 📄 Licença

Este projeto é apenas para fins de teste e estudo.

---

Feito com 💙 por [Seu Nome]
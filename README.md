# ❌⭕ Jogo da Velha (Tic-Tac-Toe) - Edição Torneio

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

Uma versão moderna, responsiva, interativa e acessível do clássico **Jogo da Velha**, desenvolvida como projeto de refatoração acadêmica a partir do tutorial oficial da biblioteca React.

O projeto transforma o exemplo monolítico do tutorial em uma aplicação de nível profissional, aplicando arquitetura modular de componentes, gerenciamento imutável de estado com Hooks (`useState` e `useEffect`), estilização encapsulada via **CSS Modules** com convenção **BEM**, suporte a Dark/Light Mode e um **Modo Torneio** com meta ajustável de vitórias.

---

## 📌 Visão Geral

O objetivo principal deste projeto foi evoluir o exemplo do tutorial aplicando boas práticas do mercado:
- **Arquitetura Component-First:** Divisão modular e co-localização de componentes.
- **Gerenciamento Imutável de Estado:** Manipulação do histórico através dos Hooks `useState` e `useEffect`.
- **Design System & Estilização:** Combinação da biblioteca de layout Bootstrap 5 com encapsulamento de escopo via CSS Modules e convenção BEM (*Block, Element, Modifier*).
- **Recursos Avançados:** Modo Torneio com escolha de meta de vitórias, tela de anúncio do Campeão, viagem no tempo (histórico), placar contínuo da sessão, alternador de tema Dark/Light Mode[cite: 1] e efeitos visuais comemorações com confetes (`canvas-confetti`).

---

## ⚙️ Regras de Negócio

- **Início e Configuração do Torneio:** A aplicação permite configurar a meta de vitórias necessária para conquistar o torneio (1 vitória/partida única, 3 vitórias/melhor de 5, ou 5 vitórias/melhor de 9)[cite: 1]. Ao iniciar, a partida começa com o tabuleiro 3x3 limpo e vez do jogador 'X'[cite: 1].
- **Alternância de Turno:** A cada jogada válida, a vez é alternada automaticamente entre 'X' e 'O'[cite: 1].
- **Jogadas Inválidas:** Cliques em células já preenchidas ou em partidas já encerradas são sumariamente ignorados[cite: 1].
- **Condição de Vitória da Rodada:** Ocorre ao alinhar 3 símbolos na horizontal, vertical ou diagonal[cite: 1]. A linha vitoriosa é destacada visualmente com animação[cite: 1] e confetes são disparados[cite: 1].
- **Empate (Velha):** Decretado quando as 9 posições são preenchidas sem que haja uma linha vitoriosa[cite: 1].
- **Encerramento do Torneio:** Quando um jogador atinge a meta de vitórias selecionada, o torneio é finalizado, bloqueando o tabuleiro e exibindo a tela de anúncio do **Grande Campeão do Torneio**[cite: 1].
- **Viagem no Tempo:** Permite navegar por qualquer ponto do histórico de jogadas da partida atual sem perder o histórico registrado.
- **Placar da Sessão:** Registro contínuo em relação à meta (Vitórias X / Meta, Empates e Vitórias O / Meta) durante o torneio[cite: 1].

---

## 🎯 Requisitos Funcionais

- **[RF01]** Renderização dinâmica do tabuleiro 3x3[cite: 1].
- **[RF02]** Controle e alternância automática de turno[cite: 1].
- **[RF03]** Validação de jogadas e bloqueio de células ocupadas[cite: 1].
- **[RF04]** Detecção de vitória e destaque animado da trinca vitoriosa[cite: 1].
- **[RF05]** Detecção e anúncio de empate (velha)[cite: 1].
- **[RF06]** Exibição do status da partida em tempo real[cite: 1].
- **[RF07]** Histórico de jogadas e navegação no tempo (*Time Travel*)[cite: 1, 2].
- **[RF08]** Botão para reiniciar a partida atual mantendo o placar acumulado[cite: 1].
- **[RF09]** Sistema de Modo Torneio com meta configurável (1, 3 ou 5 vitórias), placar acumulado e tela de Campeão[cite: 1].
- **[RF10]** Acessibilidade (atributos ARIA `role="grid"`, `role="status"`, `role="alert"`) e layout responsivo com Bootstrap[cite: 1].
- **[RF11]** Efeito comemorativo de vitória com confetes (`canvas-confetti`) e animação pulso[cite: 1, 2].
- **[RF12]** Alternador de temas Dark/Light Mode em tempo de execução via Bootstrap[cite: 1].

---

## 🛠️ Tecnologias Utilizadas

- **[React 18](https://react.dev/):** Biblioteca para construção de interfaces baseadas em componentes[cite: 1, 2].
- **[Vite](https://vitejs.dev/):** Ferramenta de build e desenvolvimento rápido[cite: 1].
- **[Bootstrap 5](https://getbootstrap.com/):** Framework CSS para estrutura responsiva (Grid System) e componentes de UI[cite: 1].
- **[CSS Modules](https://github.com/css-modules/css-modules):** Escopo local de CSS para evitar poluição e conflito de seletores globais[cite: 1, 2].
- **[Canvas-Confetti](https://www.npmjs.com/package/canvas-confetti):** Biblioteca de efeitos gráficos interativos de celebração[cite: 1, 2].

---

## 📁 Estrutura de Pastas (Component-First)

A aplicação segue a organização *Component-First* (co-localização de arquivos), onde cada componente reside em sua própria pasta acompanhado de seu respectivo arquivo de estilo CSS Module:

```text
src/
├── app.css
├── App.jsx
├── main.jsx
└── components/
    ├── Board/
    │   ├── Board.jsx
    │   └── Board.module.css
    ├── Game/
    │   ├── Game.jsx
    │   └── Game.module.css
    └── Square/
        ├── Square.jsx
        └── Square.module.css



## 🚀 Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/nicole-rcosta/jogo_da_velha.git](https://github.com/nicole-rcosta/jogo_da_velha.git)
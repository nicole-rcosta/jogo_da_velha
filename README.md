# ❌⭕ Jogo da Velha (Tic-Tac-Toe) - Versão Refatorada

Uma aplicação moderna, responsiva e otimizada do clássico Jogo da Velha, desenvolvida como projeto acadêmico de refatoração a partir do tutorial oficial do React[cite: 1].

---

## 📌 Visão Geral

O objetivo principal deste projeto foi refatorar o exemplo monolítico do tutorial do React[cite: 1, 2], aplicando:
* **Arquitetura Component-First:** Divisão modular e co-localização de componentes[cite: 1].
* **Gerenciamento Imutável de Estado:** Manipulação do histórico através dos Hooks `useState` e `useEffect`[cite: 1].
* **Design System & Estilização:** Combinação da biblioteca de layout **Bootstrap 5** com encapsulamento de escopo via **CSS Modules** e convenção **BEM** (Block, Element, Modifier)[cite: 1].
* **Recursos Avançados:** Viagem no tempo (histórico)[cite: 1], placar contínuo[cite: 1], alternador de tema Dark/Light Mode[cite: 1] e efeitos visuais comemorações com confetes (`canvas-confetti`)[cite: 1].

---

## ⚙️ Regras de Negócio

* **Início do Jogo:** A partida inicia automaticamente com o tabuleiro 3x3 limpo e vez do jogador 'X'[cite: 1].
* **Alternância de Turno:** A cada jogada válida, a vez é alternada automaticamente entre 'X' e 'O'[cite: 1].
* **Jogadas Inválidas:** Cliques em células já preenchidas ou em partidas já encerradas são sumariamente ignorados[cite: 1].
* **Condição de Vitória:** Ocorre ao alinhar 3 símbolos na horizontal, vertical ou diagonal. A linha vitoriosa é destacada visualmente[cite: 1].
* **Empate (Velha):** Decretado quando as 9 posições são preenchidas sem que haja uma linha vitoriosa[cite: 1].
* **Viagem no Tempo:** Permite navegar por qualquer ponto do histórico de jogadas sem perder o histórico anterior[cite: 1].
* **Placar de Pontuação:** Registro contínuo de vitórias de X, O e Empates durante a sessão de uso[cite: 1].

---

## 🎯 Requisitos Funcionais

* **[RF01]** Renderização dinâmica do tabuleiro 3x3[cite: 1].
* **[RF02]** Controle e alternância automática de turno[cite: 1].
* **[RF03]** Validação de jogadas e bloqueio de células ocupadas[cite: 1].
* **[RF04]** Detecção de vitória e destaque da trinca vitoriosa[cite: 1].
* **[RF05]** Detecção e anúncio de empate (velha)[cite: 1].
* **[RF06]** Exibição do status da partida em tempo real[cite: 1].
* **[RF07]** Histórico de jogadas e navegação no tempo (Time Travel)[cite: 1].
* **[RF08]** Botão para reiniciar partida mantendo o placar da sessão[cite: 1].
* **[RF09]** Placar acumulado da sessão (Vitórias X, Vitórias O e Empates)[cite: 1].
* **[RF10]** Acessibilidade (atributos `aria-*`) e layout responsivo com Bootstrap[cite: 1].
* **[RF11]** Efeito comemorativo de vitória com confetes (`canvas-confetti`) e animação pulso[cite: 1].
* **[RF12]** Alternador de temas Dark/Light Mode em tempo de execução[cite: 1].

---

## 🛠️ Tecnologias Utilizadas

* **[React 18](https://react.dev/):** Biblioteca para construção de interfaces baseadas em componentes[cite: 1].
* **[Vite](https://vitejs.dev/):** Ferramenta de build e desenvolvimento rápido[cite: 1].
* **[Bootstrap 5](https://getbootstrap.com/):** Framework CSS para estrutura responsiva (Grid System) e componentes de UI[cite: 1].
* **[CSS Modules](https://github.com/css-modules/css-modules):** Escopo local de CSS para evitar poluição e conflito de seletores globais[cite: 1].
* **[Canvas-Confetti](https://www.npmjs.com/package/canvas-confetti):** Biblioteca de efeitos gráficos interativos de celebração[cite: 1].

---

## 📁 Estrutura de Pastas (Component-First)

```text
src/
├── components/
│   ├── Square/
│   │   ├── Square.jsx
│   │   └── Square.module.css
│   ├── Board/
│   │   ├── Board.jsx
│   │   └── Board.module.css
│   └── Game/
│       ├── Game.jsx
│       └── Game.module.css
├── App.jsx
└── main.jsx
```[cite: 1]

---

## 🚀 Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/nicole-rcosta/jogo_da_velha.git](https://github.com/nicole-rcosta/jogo_da_velha.git)
   cd jogo-da-velha-react
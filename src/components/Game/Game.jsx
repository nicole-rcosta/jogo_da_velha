import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'; // [RF11] Efeito visual de vitória
import Board from '../Board/Board.jsx';
import styles from './Game.module.css';

/**
 * Função utilitária: Retorna o vencedor ('X' ou 'O') e a linha vitoriosa [RF04]
 */
function calcularVencedor(quadrados) {
  const linhasVencedoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
  ];

  for (let i = 0; i < linhasVencedoras.length; i++) {
    const [a, b, c] = linhasVencedoras[i];
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
      return { vencedor: quadrados[a], linha: linhasVencedoras[i] };
    }
  }
  return null;
}

/**
 * Componente Principal Game [RF01-RF12]
 */
export default function Game() {
  // [RF07] Histórico e Viagem no tempo
  const [historico, setHistorico] = useState([Array(9).fill(null)]);
  const [jogadaAtual, setJogadaAtual] = useState(0);

  // [RF09] Placar da Sessão
  const [placar, setPlacar] = useState({ vitoriasX: 0, vitoriasO: 0, empates: 0 });

  // [RF12] Alternador de Tema Dark / Light Mode
  const [modoEscuro, setModoEscuro] = useState(false);

  const eProximoX = jogadaAtual % 2 === 0; // [RF02]
  const quadradosAtuais = historico[jogadaAtual];

  const informacaoVitoria = calcularVencedor(quadradosAtuais);
  const vencedor = informacaoVitoria ? informacaoVitoria.vencedor : null;
  const linhaVencedora = informacaoVitoria ? informacaoVitoria.linha : null;
  const tabuleiroCheio = quadradosAtuais.every((quadrado) => quadrado !== null); // [RF05]
  const jogoFinalizado = Boolean(vencedor || tabuleiroCheio);

  // [RF11] Comemoração Visual de Vitória com Confetes
  useEffect(() => {
    if (vencedor) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [vencedor]);

  // [RF09] Atualização do Placar Acumulado da Sessão
  useEffect(() => {
    if (vencedor === 'X') {
      setPlacar(prev => ({ ...prev, vitoriasX: prev.vitoriasX + 1 }));
    } else if (vencedor === 'O') {
      setPlacar(prev => ({ ...prev, vitoriasO: prev.vitoriasO + 1 }));
    } else if (tabuleiroCheio && !vencedor) {
      setPlacar(prev => ({ ...prev, empates: prev.empates + 1 }));
    }
  }, [historico.length, vencedor, tabuleiroCheio]);

  // [RF12] Alternar Cores Globais da Aplicação
  const alternarTema = () => {
    const novoModo = !modoEscuro;
    setModoEscuro(novoModo);
    document.documentElement.setAttribute('data-bs-theme', novoModo ? 'dark' : 'light');
  };

  // [RF02/RF03] Realiza jogada imutável
  function lidarComJogada(indice) {
    const proximosQuadrados = quadradosAtuais.slice();
    proximosQuadrados[indice] = eProximoX ? 'X' : 'O';

    const proximoHistorico = [...historico.slice(0, jogadaAtual + 1), proximosQuadrados];
    setHistorico(proximoHistorico);
    setJogadaAtual(proximoHistorico.length - 1);
  }

  // [RF07] Navegar no Histórico (Viagem no Tempo)
  function irParaJogada(proximaJogada) {
    setJogadaAtual(proximaJogada);
  }

  // [RF08] Reinicia o tabuleiro mantendo a sessão atual
  function reiniciarPartida() {
    setHistorico([Array(9).fill(null)]);
    setJogadaAtual(0);
  }

  // [RF06] Status em Tempo Real
  let mensagemStatus;
  if (vencedor) {
    mensagemStatus = `🎉 Vencedor: Jogador ${vencedor}!`;
  } else if (tabuleiroCheio) {
    mensagemStatus = '🤝 Empate (Velha)!';
  } else {
    mensagemStatus = `Vez do Jogador: ${eProximoX ? 'X' : 'O'}`;
  }

  return (
    <div className={`${styles.gameContainer} container my-4`}>
      {/* Botão Dark/Light Mode [RF12] */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 m-0">Jogo da Velha</h1>
        <button className="btn btn-outline-secondary btn-sm" onClick={alternarTema}>
          {modoEscuro ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
        </button>
      </div>

      {/* Placar da Sessão [RF09] com Bootstrap Grid [RF10] */}
      <div className="row text-center mb-4">
        <div className="col-4">
          <div className="p-2 border rounded bg-body-tertiary">
            <span className="fw-bold d-block">Jogador X</span>
            <span className="fs-4 text-primary">{placar.vitoriasX}</span>
          </div>
        </div>
        <div className="col-4">
          <div className="p-2 border rounded bg-body-tertiary">
            <span className="fw-bold d-block">Empates</span>
            <span className="fs-4 text-secondary">{placar.empates}</span>
          </div>
        </div>
        <div className="col-4">
          <div className="p-2 border rounded bg-body-tertiary">
            <span className="fw-bold d-block">Jogador O</span>
            <span className="fs-4 text-danger">{placar.vitoriasO}</span>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Painel do Tabuleiro [RF01] */}
        <div className="col-md-7 text-center mb-4">
          <div className="alert alert-info py-2 mb-3" role="status">
            <span className="fw-semibold">{mensagemStatus}</span>
          </div>
          <Board
            squares={quadradosAtuais}
            onPlay={lidarComJogada}
            linhaVencedora={linhaVencedora}
            jogoFinalizado={jogoFinalizado}
          />
          <button className="btn btn-primary mt-3" onClick={reiniciarPartida}>
            🔄 Reiniciar Partida
          </button>
        </div>

        {/* Histórico e Viagem no Tempo [RF07] */}
        <div className="col-md-5">
          <h2 className="h5 mb-3">Histórico de Jogadas</h2>
          <ol className={`list-group list-group-numbered ${styles.listaHistorico}`}>
            {historico.map((_, jogada) => {
              const descricao = jogada > 0 ? `Ir para a jogada #${jogada}` : 'Início do jogo';
              const eAJogadaAtual = jogada === jogadaAtual;

              return (
                <li key={jogada} className="list-group-item d-flex justify-content-between align-items-center p-1">
                  <button
                    className={`btn btn-sm w-100 text-start ${eAJogadaAtual ? 'btn-success fw-bold' : 'btn-link text-decoration-none'}`}
                    onClick={() => irParaJogada(jogada)}
                  >
                    {descricao} {eAJogadaAtual && '(Atual)'}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

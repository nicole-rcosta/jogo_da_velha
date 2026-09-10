// src/components/Game/Game.jsx
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Board from '../Board/Board.jsx';
import styles from './Game.module.css';

/**
 * Avalia o tabuleiro e retorna o vencedor e a linha vencedora.
 */
function calcularVencedor(quadrados) {
  const linhasVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < linhasVencedoras.length; i++) {
    const [a, b, c] = linhasVencedoras[i];

    if (
      quadrados[a] &&
      quadrados[a] === quadrados[b] &&
      quadrados[a] === quadrados[c]
    ) {
      return {
        vencedor: quadrados[a],
        linha: linhasVencedoras[i],
      };
    }
  }

  return null;
}

export default function Game() {
  // Histórico de jogadas
  const [historico, setHistorico] = useState([Array(9).fill(null)]);
  const [jogadaAtual, setJogadaAtual] = useState(0);

  // Placar
  const [placar, setPlacar] = useState({
    vitoriasX: 0,
    vitoriasO: 0,
    empates: 0,
  });

  // Configurações do torneio
  const [metaDeVitorias, setMetaDeVitorias] = useState(3);
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const [campeaoTorneio, setCampeaoTorneio] = useState(null);

  // Tema
  const [modoEscuro, setModoEscuro] = useState(false);

  // ========================================
  // VARIÁVEIS DERIVADAS
  // ========================================

  const eProximoX = jogadaAtual % 2 === 0;
  const quadradosAtuais = historico[jogadaAtual];

  const informacaoVitoria = calcularVencedor(quadradosAtuais);

  const vencedor = informacaoVitoria
    ? informacaoVitoria.vencedor
    : null;

  const linhaVencedora = informacaoVitoria
    ? informacaoVitoria.linha
    : null;

  const tabuleiroCheio = quadradosAtuais.every(
    (quadrado) => quadrado !== null
  );

  const jogoFinalizado = Boolean(vencedor || tabuleiroCheio);

  // ========================================
  // TEMA
  // ========================================

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-bs-theme',
      modoEscuro ? 'dark' : 'light'
    );
  }, [modoEscuro]);

  function alternarTema() {
    setModoEscuro((prev) => !prev);
  }

  // ========================================
  // CONFETES
  // ========================================

  useEffect(() => {
    if (vencedor) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [vencedor]);

  // ========================================
  // ATUALIZAÇÃO DO PLACAR
  // ========================================

  useEffect(() => {
    if (!jogoIniciado || !jogoFinalizado) {
      return;
    }

    if (vencedor === 'X') {
      setPlacar((prev) => ({
        ...prev,
        vitoriasX: prev.vitoriasX + 1,
      }));
    } else if (vencedor === 'O') {
      setPlacar((prev) => ({
        ...prev,
        vitoriasO: prev.vitoriasO + 1,
      }));
    } else if (tabuleiroCheio && !vencedor) {
      setPlacar((prev) => ({
        ...prev,
        empates: prev.empates + 1,
      }));
    }
  }, [jogoFinalizado]);

  // ========================================
  // CAMPEÃO DO TORNEIO
  // ========================================

  useEffect(() => {
    if (placar.vitoriasX >= metaDeVitorias) {
      setCampeaoTorneio('Jogador X');
    } else if (placar.vitoriasO >= metaDeVitorias) {
      setCampeaoTorneio('Jogador O');
    }
  }, [placar, metaDeVitorias]);

  // ========================================
  // JOGADAS
  // ========================================

  function lidarComJogada(indice) {
    if (quadradosAtuais[indice] || jogoFinalizado) {
      return;
    }

    const proximosQuadrados = quadradosAtuais.slice();

    proximosQuadrados[indice] = eProximoX ? 'X' : 'O';

    const proximoHistorico = [
      ...historico.slice(0, jogadaAtual + 1),
      proximosQuadrados,
    ];

    setHistorico(proximoHistorico);
    setJogadaAtual(proximoHistorico.length - 1);
  }

  // ========================================
  // HISTÓRICO
  // ========================================

  function irParaJogada(proximaJogada) {
    setJogadaAtual(proximaJogada);
  }

  // ========================================
  // REINICIAR PARTIDA
  // ========================================

  function reiniciarPartida() {
    setHistorico([Array(9).fill(null)]);
    setJogadaAtual(0);
  }

  // ========================================
  // INICIAR NOVO TORNEIO
  // ========================================

  function iniciarTorneio() {
    setPlacar({
      vitoriasX: 0,
      vitoriasO: 0,
      empates: 0,
    });

    setHistorico([Array(9).fill(null)]);
    setJogadaAtual(0);
    setCampeaoTorneio(null);
    setJogoIniciado(true);
  }

  // ========================================
  // MENSAGEM DE STATUS
  // ========================================

  let mensagemStatus;

  if (vencedor) {
    mensagemStatus = `🎉 Vencedor da Rodada: Jogador ${vencedor}!`;
  } else if (tabuleiroCheio) {
    mensagemStatus = '🤝 Empate (Velha)!';
  } else {
    mensagemStatus = `Vez do Jogador: ${eProximoX ? 'X' : 'O'}`;
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className={styles.gameContainer}>

      {/* ========================================
          CABEÇALHO
      ======================================== */}

      <div className={styles.header}>
        <h1 className={styles.tituloPrincipal}>
          Jogo da Velha
        </h1>

        <button
          type="button"
          className={styles.botaoTema}
          onClick={alternarTema}
        >
          {modoEscuro ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
        </button>
      </div>

      {/* ========================================
          CONFIGURAÇÃO INICIAL
      ======================================== */}

      {!jogoIniciado ? (
        <div className={styles.torneioConfig}>
          <h2 className="h4 mb-3">
            Configurações do Torneio
          </h2>

          <div
            className="mb-3 mx-auto"
            style={{ maxWidth: '300px' }}
          >
            <label
              htmlFor="metaVitorias"
              className="form-label fw-bold"
            >
              Vitórias para vencer o torneio:
            </label>

            <select
              id="metaVitorias"
              className="form-select text-center"
              value={metaDeVitorias}
              onChange={(e) =>
                setMetaDeVitorias(Number(e.target.value))
              }
            >
              <option value={1}>
                1 Vitória (Partida Única)
              </option>

              <option value={3}>
                3 Vitórias (Melhor de 5)
              </option>

              <option value={5}>
                5 Vitórias (Melhor de 9)
              </option>
            </select>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-success btn-lg px-4"
              onClick={iniciarTorneio}
            >
              🎮 Iniciar Torneio
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ========================================
              PLACAR
          ======================================== */}

          <div className={`row text-center ${styles.placar}`}>

            {/* Jogador X */}
            <div className="col-4">
              <div className={styles.cardPlacar}>
                <span className={styles.nomeJogador}>
                  Jogador X
                </span>

                <span
                  className={`${styles.valorPlacar} ${styles.valorX}`}
                >
                  {placar.vitoriasX} / {metaDeVitorias}
                </span>
              </div>
            </div>

            {/* Empates */}
            <div className="col-4">
              <div className={styles.cardPlacar}>
                <span className={styles.nomeJogador}>
                  Empates
                </span>

                <span
                  className={`${styles.valorPlacar} ${styles.valorEmpate}`}
                >
                  {placar.empates}
                </span>
              </div>
            </div>

            {/* Jogador O */}
            <div className="col-4">
              <div className={styles.cardPlacar}>
                <span className={styles.nomeJogador}>
                  Jogador O
                </span>

                <span
                  className={`${styles.valorPlacar} ${styles.valorO}`}
                >
                  {placar.vitoriasO} / {metaDeVitorias}
                </span>
              </div>
            </div>

          </div>

          {/* ========================================
              CAMPEÃO DO TORNEIO
          ======================================== */}

          {campeaoTorneio ? (
            <div className={styles.campeaoTorneio} role="alert">

              <h2 className="h3 mb-2">
                🏆 {campeaoTorneio} é o Grande Campeão do
                Torneio! 🏆
              </h2>

              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={iniciarTorneio}
              >
                Novo Torneio
              </button>
            </div>
          ) : (

            /* ========================================
                ÁREA PRINCIPAL
            ======================================== */

            <div className={`row ${styles.areaJogo}`}>

              {/* ========================================
                  TABULEIRO
              ======================================== */}

              <div
                className={`col-md-7 ${styles.painelTabuleiro}`}
              >
                <div
                  className={styles.statusJogo}
                  role="status"
                >
                  {mensagemStatus}
                </div>

                <Board
                  squares={quadradosAtuais}
                  onPlay={lidarComJogada}
                  linhaVencedora={linhaVencedora}
                  jogoFinalizado={jogoFinalizado}
                />

                <button
                  type="button"
                  className={styles.botaoReiniciar}
                  onClick={reiniciarPartida}
                >
                  Reiniciar Esta Partida
                </button>
              </div>

              {/* ========================================
                  HISTÓRICO
              ======================================== */}

              <div
                className={`col-md-5 ${styles.painelHistorico}`}
              >
                <h2 className={styles.tituloHistorico}>
                  Histórico de Jogadas
                </h2>

                <ol
                  className={`list-group list-group-numbered ${styles.listaHistorico}`}
                >
                  {historico.map((_, jogada) => {
                    const descricao =
                      jogada > 0
                        ? `Ir para a jogada #${jogada}`
                        : 'Início do jogo';

                    const eAJogadaAtual =
                      jogada === jogadaAtual;

                    return (
                      <li
                        key={jogada}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <button
                          type="button"
                          className={`btn btn-sm w-100 text-start ${
                            eAJogadaAtual
                              ? 'btn-success fw-bold'
                              : 'btn-link text-decoration-none'
                          }`}
                          onClick={() =>
                            irParaJogada(jogada)
                          }
                        >
                          {descricao}{' '}
                          {eAJogadaAtual && '(Atual)'}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>

            </div>
          )}
        </>
      )}
    </div>
  );
}

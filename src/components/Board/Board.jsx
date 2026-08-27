
import Square from '../Square/Square.jsx';
import styles from './Board.module.css';


export default function Board({ squares, onPlay, linhaVencedora, jogoFinalizado }) {

  function processarClique(indice) {
    if (squares[indice] || jogoFinalizado) {
      return;
    }
    onPlay(indice);
  }

  return (
    <div className={styles.boardGrid} role="grid" aria-label="Tabuleiro do Jogo da Velha">
      {squares.map((valorDoQuadrado, indice) => {
        const eQuadradoVencedor = linhaVencedora ? linhaVencedora.includes(indice) : false;

        return (
          <Square
            key={indice}
            value={valorDoQuadrado}
            onSquareClick={() => processarClique(indice)}
            eQuadradoVencedor={eQuadradoVencedor}
            desabilitado={jogoFinalizado && !eQuadradoVencedor}
          />
        );
      })}
    </div>
  );
}

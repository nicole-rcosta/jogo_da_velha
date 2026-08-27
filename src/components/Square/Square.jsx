
import styles from './Square.module.css';


export default function Square({ value, onSquareClick, eQuadradoVencedor, desabilitado }) {
  const classesDoQuadrado = `${styles.square} ${eQuadradoVencedor ? styles['square--winning'] : ''}`;

  return (
    <button
      type="button"
      className={classesDoQuadrado}
      onClick={onSquareClick}
      disabled={desabilitado}
      aria-label={value ? `Quadrado preenchido com ${value}` : 'Quadrado vazio'}
    >
      {value}
    </button>
  );
}
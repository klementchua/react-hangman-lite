import styles from './keyboard.module.css';

type KeyboardProps = {
  gameOver: boolean;
  correctLetters: string[];
  incorrectLetters: string[];
  addGuessedLetter: (letter: string) => void;
};

const LETTERS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
] as const;

export default function Keyboard({
  gameOver,
  correctLetters,
  incorrectLetters,
  addGuessedLetter,
}: KeyboardProps) {
  return (
    <div className={styles.container}>
      {LETTERS.map((letter: string, index: number) => {
        return (
          <button
            onClick={() => addGuessedLetter(letter)}
            key={index}
            disabled={
              correctLetters.includes(letter) ||
              incorrectLetters.includes(letter) ||
              gameOver
            }
            className={correctLetters.includes(letter) ? styles.correct : ''}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}

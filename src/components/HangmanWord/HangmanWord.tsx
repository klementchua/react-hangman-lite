import styles from './hangmanWord.module.css';

type HangmanWordProps = {
  gameLost: boolean;
  word: string;
  guessedLetters: string[];
};

export default function HangmanWord({
  gameLost,
  word,
  guessedLetters,
}: HangmanWordProps) {
  return (
    <div className={styles.container}>
      {word.split('').map((char, index) => {
        const charGuessed = guessedLetters.includes(char);

        return (
          <div key={index} className={styles.characterContainer}>
            <span
              className={
                charGuessed
                  ? styles.showChar
                  : gameLost
                  ? styles.lostGame
                  : styles.hideChar
              }
            >
              {char}
            </span>
            <span className={styles.character}></span>
          </div>
        );
      })}
    </div>
  );
}

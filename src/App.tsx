import { useState, useEffect, useCallback } from 'react';
import HangmanDrawing from './components/HangmanDrawing/HangmanDrawing';
import HangmanWord from './components/HangmanWord/HangmanWord';
import Keyboard from './components/Keyboard/Keyboard';
import words from './wordList.json';

function getWord(): string {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [word, setWord] = useState(getWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const addGuessedLetter = useCallback(
    (letter: string): void => {
      if (guessedLetters.includes(letter)) return;
      setGuessedLetters([...guessedLetters, letter]);
    },
    [guessedLetters]
  );

  const correctLetters = guessedLetters.filter((letter) =>
    word.includes(letter)
  );
  const incorrectLetters = guessedLetters.filter(
    (letter) => !word.includes(letter)
  );

  const gameWon =
    Array.from(new Set(word.split(''))).length === correctLetters.length;
  const gameLost = incorrectLetters.length >= 6;
  const gameOver = gameWon || gameLost;

  // Effect for attaching event listener for restarting game
  useEffect(() => {
    function restartGame(e: KeyboardEvent): void {
      if (!gameOver) return;
      if (e.key === 'Enter') {
        setWord(getWord());
        setGuessedLetters([]);
      }
    }

    document.addEventListener('keypress', restartGame);
    return () => document.removeEventListener('keypress', restartGame);
  }, [gameOver]);

  // Effect for attaching event listener for keyboard press
  useEffect(() => {
    function keyboardInput(e: KeyboardEvent): void {
      if (e.key.match(/[a-z]/g)) {
        addGuessedLetter(e.key);
      }
    }
    document.addEventListener('keypress', keyboardInput);
    return () => document.removeEventListener('keypress', keyboardInput);
  }, [addGuessedLetter]);

  return (
    <div id="gameContainer">
      <h1>{gameWon ? 'You win! :D' : gameLost ? 'You lost. :(' : ''}</h1>
      <HangmanDrawing numWrong={incorrectLetters.length} />
      <HangmanWord
        gameLost={gameLost}
        word={word}
        guessedLetters={guessedLetters}
      />
      <Keyboard
        gameOver={gameOver}
        correctLetters={correctLetters}
        incorrectLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
      />
    </div>
  );
}

export default App;

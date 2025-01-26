import styles from './hangmanDrawing.module.css';

type HangmanProps = {
  numWrong: number;
};

const BODY_PARTS = [
  styles.bodyOne,
  styles.bodyTwo,
  styles.bodyThree,
  styles.bodyFour,
  styles.bodyFive,
  styles.bodySix,
] as const;

export default function HangmanDrawing({ numWrong }: HangmanProps) {
  return (
    <div className={styles.container}>
      <div className={styles.standOne}></div>
      <div className={styles.standTwo}></div>
      <div className={styles.standThree}></div>
      <div className={styles.standFour}></div>
      {BODY_PARTS.map((bodyPart, index) => {
        if (index + 1 <= numWrong) {
          return <div className={bodyPart} key={index}></div>;
        }
      })}
    </div>
  );
}

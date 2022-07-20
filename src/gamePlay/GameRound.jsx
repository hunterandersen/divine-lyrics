import { useState, useEffect } from "react";
import LyricsBlock from "./LyricsBlock";

/**
 *
 * @param {Object} param0 Array of objects storing the songName, artist, and lyrics
 * @returns One full round of game play
 */
export default function GameRound({ songsInfo }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [guess, setGuess] = useState("");
  let correctCount = 0;
  //const SONGS_COUNT = songsInfo.length;

  useEffect(() => {
    console.log(questionIndex);
  }, [questionIndex]);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      guess.toLowerCase() == songsInfo[questionIndex].songName.toLowerCase()
    ) {
      correctCount++;
    }
    console.log(correctCount);
    setQuestionIndex((questionIndex) => questionIndex + 1);
  }

  return (
    <div>
      {songsInfo ? (
        <div>
          <LyricsBlock songData={songsInfo[questionIndex]} />
          <form>
            <label htmlFor="guessInput">Guess Song Name: </label>
            <input
              type="text"
              name="guessInput"
              id="guessInput"
              onChange={(e) => setGuess(e.target.value)}
            />
            <button type="submit" onSubmit={(e) => handleSubmit(e)}>
              Enter
            </button>
          </form>
        </div>
      ) : (
        <p>Error: Could not retrieve song list information</p>
      )}
    </div>
  );
}

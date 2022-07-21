import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import LyricsBlock from "./LyricsBlock";

/**
 *
 * @param {Object} param0 Array of objects storing the songName, artist, and lyrics
 * @returns One full round of game play
 */
export default function GameRound() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const {lyricsData} = useOutletContext();
  let correctCount = 0;
  //const SONGS_COUNT = lyricsData.length;

  useEffect(() => {
    console.log(questionIndex);
  }, [questionIndex]);

  useEffect(()=>{
    console.log(lyricsData);
  }, [lyricsData]);

  function handleSubmit(e) {
    //e.preventDefault();
    console.log(guess, lyricsData[questionIndex].songName, correctCount);
    if (
      guess.toLowerCase() == lyricsData[questionIndex].songName.toLowerCase()
    ) {
      correctCount++;
    }
    
    setQuestionIndex((questionIndex) => questionIndex + 1);
  }

  return (
    <div>
      {lyricsData ? (
        <div>
          <LyricsBlock songData={lyricsData[questionIndex]} />
          <span>{`CorrectCount: ${correctCount}`}</span>
          <form>
            <label htmlFor="guessInput">Guess Song Name: </label>
            <input
              type="text"
              name="guessInput"
              id="guessInput"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <button onClick={(e) => handleSubmit(e)}>
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

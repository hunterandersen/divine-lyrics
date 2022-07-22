import { useState, useRef } from "react";
import { useOutletContext } from "react-router";
import LyricsBlock from "./LyricsBlock";
import {TEST_LYRICS_DATA_TEN} from "./dummyData"
import "./style.css";

export default function GameRound() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [guess, setGuess] = useState("");
  let correctCount = useRef(0);
  //const {lyricsData} = useOutletContext();
  //THIS IS FOR TESTING SO THAT I DON'T HAVE TO KEEP MAKING API CALLS
  const lyricsData = TEST_LYRICS_DATA_TEN;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(
      guess,
      lyricsData[questionIndex].songName,
      correctCount.current
    );
    if (
      //replace(RegExp('  +', '\g'), ' ') to trim down to single spaces
      guess.replace(RegExp(' ', 'g'), '').toLowerCase() == lyricsData[questionIndex].songName.replace(RegExp(' ', 'g'), '').toLowerCase()
    ) {
      correctCount.current++;
    }

    setQuestionIndex((questionIndex) => questionIndex + 1);
    setGuess("");
  }

  return (
    <div>
      {lyricsData ? (
        <div>
          <LyricsBlock songData={lyricsData[questionIndex]} />
          <span>{`CorrectCount: ${correctCount.current}`}</span>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="guessInput">Guess Song Name: </label>
            <input
              type="text"
              name="guessInput"
              id="guessInput"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <button type="submit">Enter</button>
          </form>
        </div>
      ) : (
        <p>Error: Could not retrieve song list information</p>
      )}
    </div>
  );
}

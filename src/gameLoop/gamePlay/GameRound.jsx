import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { Link } from "react-router-dom";
import LyricsBlock from "./LyricsBlock";
import RoundRecapModal from "./RoundRecapModal";
import { TEST_LYRICS_DATA_TEN } from "./dummyData";
import "./style-game-round.css";

export default function GameRound() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [guessResults, setGuessResults] = useState([]);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [isModalHidden, setIsModalHidden] = useState(true);
  const { lyricsData } = useOutletContext();
  //THIS IS FOR TESTING SO THAT I DON'T HAVE TO KEEP MAKING API CALLS
  //const lyricsData = TEST_LYRICS_DATA_TEN;

  function handleSubmit(e) {
    console.log("handle submit");
    e.preventDefault();
    if (
      //replace(RegExp('  +', '\g'), ' ') to trim down to single spaces
      guess.replace(RegExp(" ", "g"), "").toLowerCase() ===
      lyricsData[questionIndex].songName
        .replace(RegExp(" ", "g"), "")
        .toLowerCase()
    ) {
      setGuessResults((prev) => {
        return prev.concat({
          songName: lyricsData[questionIndex].songName,
          artist: lyricsData[questionIndex].artist,
          guessName: guess,
          wasCorrect: true,
        });
      });
    } else {
      setGuessResults((prev) => {
        return prev.concat({
          songName: lyricsData[questionIndex].songName,
          artist: lyricsData[questionIndex].artist,
          guessName: guess,
          wasCorrect: false,
        });
      });
    }

    setQuestionIndex((questionIndex) => questionIndex + 1);
    setGuess("");
  }

  useEffect(() => {
    if (lyricsData && questionIndex >= lyricsData.length) {
      setIsModalHidden(false);
      setIsRoundOver(true);
    }
  }, [questionIndex, lyricsData]);

  function toggleModal() {
    setIsModalHidden((prev) => !prev);
  }

  return (
    <div>
      <Link className="tester" to="">Test Link</Link>
      {lyricsData ? (
        <div className="flex-column">
          <LyricsBlock songData={lyricsData[questionIndex]} />
          <form className="form-guess" onSubmit={(e) => handleSubmit(e)}>
            <label className="input-label" htmlFor="guessInput">
              Guess Song Name:{" "}
            </label>
            <input
              className="input-field"
              type="text"
              name="guessInput"
              id="guessInput"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <button className="button" type="submit">
              Enter
            </button>
            <button className="button" type="submit">
              Skip
            </button>
          </form>
        </div>
      ) : (
        <p>Error: Could not retrieve song list information</p>
      )}
      <RoundRecapModal
        guessResults={guessResults}
        modalIsHidden={isModalHidden}
        toggleModal={toggleModal}
      />
      {isModalHidden && isRoundOver ? (
        <button className="button" onClick={toggleModal}>
          View Recap
        </button>
      ) : (
        <></>
      )}
      {isRoundOver ? (
        <Link className="button" to="/">New Round</Link>
      ) : <></>}
    </div>
  );
}

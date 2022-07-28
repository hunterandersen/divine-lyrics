import React from 'react'

export default function RoundRecapModal({modalIsHidden, toggleModal, guessResults}) {

  const correctGuessCount = guessResults.reduce((acc, guess)=>{
    if (guess.wasCorrect) return ++acc;
    return acc;
  }, 0);

  return (
    <div className={`modal-main ${modalIsHidden? "modal-hidden" : ""}`}>
        <div className="modal-content">
            <div onClick={toggleModal} className="close-button">&times;</div>
            <span className="modal-title">{correctGuessCount} Correct</span>
            <ol className="modal-ol">
              {guessResults.map((guess, index)=>{
                return <li key={`${guess.songName}+${index}`} className={`modal-recap-line recap-${guess.wasCorrect}`}>
                  Song: {guess.songName}-- Your Guess: {guess.guessName}
                </li>
              })}
            </ol>
            <p>Some Modal Text</p>
        </div>
    </div>
  )
}

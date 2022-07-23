import React from 'react'

export default function RoundRecapModal({modalIsHidden, toggleModal, guessResults}) {
  return (
    <div className={`modal-main ${modalIsHidden? "modal-hidden" : ""}`}>
        <div className="modal-content">
            <span onClick={toggleModal} className="close-button">&times;</span>
            <span>{guessResults.length}</span>
            <ul>
              {guessResults.map((guess, index)=>{
                return <li key={`${guess.songName}+${index}`} className={`recap-${guess.wasCorrect}`}>
                  Song: {guess.songName}-- Your Guess: {guess.guessName}
                </li>
              })}
            </ul>
            <p>Some Modal Text</p>
        </div>
    </div>
  )
}

import React from 'react'

/**
 * 
 * id:<string? or Number?>,
    songName: <string>,
    artist: <string>,
    lyrics: <string>,
 * 
 * @param {Object} songData Data about the song to guess
 * @returns 
 */

export default function LyricsBlock({songData}) {

  let lines = [""];
  if (songData && songData.lyrics){
    lines = songData.lyrics.split('\n');
  }

  return (
    <div className="lyrics-container">
      <ul className="lyrics-ul">
        {lines.map((line, index)=>{
          return <li className="lyrics-line" key={index}>{line}</li>
        })}
      </ul>
    </div>
  )
}

import React from "react";
import { useState } from "react";

export default function CuratedSongsForm({ handleClick }) {
  const [artist, setArtist] = useState("Queen");
  const [songName, setSongName] = useState("Bohemian Rhapsody");

  return (
    <div>
      <form className="curation-form">
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          name="artist"
          id="artist"
          onChange={(e) => setArtist(e.target.value)}
        />
        <label htmlFor="songName">Song:</label>
        <input
          type="text"
          name="songName"
          id="songName"
          onChange={(e) => setSongName(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleClick(artist, songName);
          }}
        >
          Get Related Songs
        </button>
      </form>
    </div>
  );
}

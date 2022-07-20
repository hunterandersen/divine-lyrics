import { APIService } from "../shared/API.service";
import { useState } from "react";
import "./style.css";
import CuratedSongsForm from "./CuratedSongsForm";

export default function ListCurator() {
  const [songList, setSongList] = useState(null);

  async function getCuratedList(artist, name) {
    let songs = await APIService.getSongList(artist, name);
     if (songs && songs.mus && songs.mus[0].related) {
      console.log(songs);
      setSongList(songs);
    } else {
      console.log(songs);
      setSongList(null);
    }
  }

  function handleClick(artist, name) {
    console.log("Button clicked");
    getCuratedList(artist, name);
  }

  let resBuilder = <></>;

  if (songList && songList.type === "song_notfound") {
    console.log("Song Gone");
    resBuilder = <p>Could not find related songs</p>;
  } else if (songList?.mus[0]?.related.length > 0) {
    resBuilder = (
      <ul className="curated-songs-list">
        {songList.mus[0].related.map(({ art, mus }) => {
          return (
            <li key={`${art.id}+${mus.id}`}>
              <p>{`"${mus.name}" by: ${art.name}`}</p>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div>
      <CuratedSongsForm handleClick={handleClick} />
      <h2>
        {songList? `Songs related to ${songList.mus[0].name} by: ${songList.art.name}`
          : "Related Songs List"}
      </h2>
      {resBuilder}
    </div>
  );

}

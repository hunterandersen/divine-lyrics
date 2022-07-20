import { Outlet } from "react-router";
import { useState } from "react";

export default function GameLoop() {
  const [songList, setSongList] = useState([]);

  function updateList(data) {
    setSongList(data);
  }

  return (
    <div>
      <h1>Game Loop Title</h1>
      <Outlet songsInfo={songList} updateSongList={updateList} />
    </div>
  );
}

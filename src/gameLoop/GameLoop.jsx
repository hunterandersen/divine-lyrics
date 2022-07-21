import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { APIService } from "../shared/API.service";

export default function GameLoop() {
  const [songList, setSongList] = useState(null);
  const [lyricsData, setLyricsData] = useState(null);

  function fetchTheLyrics(){
    console.log(songList);
    if (songList) {
      let additionalSongs = [];
      if (lyricsData) {
        console.log("Both arrays were true");
        additionalSongs = songList.mus[0].related.map((relSong) => {
          if (!lyricsData.some((song)=>{
            return song.id === relSong.mus.id;
          })) {
            return {
              id: relSong.mus.id,
              songName: relSong.mus.name,
              artist: relSong.art.name,
            };
          }else{
            return null;
          }
        });
      } else {
        additionalSongs = songList.mus[0].related.map((relSong) => {
          return {
            id: relSong.mus.id,
            songName: relSong.mus.name,
            artist: relSong.art.name,
          };
        });
      }
      //Fetch the new songs' lyrics
      const newLyrics = [];
      //Batch all the fetch requests
      const lyricsRequests = [];
      additionalSongs.forEach((song)=>{
        if (song && song.id){
          lyricsRequests.push(APIService.getLyrics(song.id));
        }
      });
      //Wait for all the fetch requests to resolve
      Promise.all(lyricsRequests).then((allLyricsData)=>{
        console.log(allLyricsData);
        //Handle the result of all the fetch requests' data.
        if (allLyricsData){
          allLyricsData.forEach((song)=>{
            newLyrics.push({
              id:song.mus[0].id,
              songName:song.mus[0].name,
              artist:song.art.name,
              lyrics:song.mus[0].text,
            });
          });
          //Add the new lyrics to the pool of options
          console.log("Updating Lyrics data");
          if (lyricsData) {
            setLyricsData((lyrics) => {
              let tempArr = [...lyrics, ...newLyrics];
              console.log("tempArr", tempArr);
              return tempArr;
            });
          } else {
            let tempArr = [...newLyrics];
            console.log("tempArr", tempArr);
            setLyricsData(tempArr);
          }
        }
      });

    }
  }

  //Find any new songs and add them to the list
  useEffect(() => {
    console.log("useEffect in GameLoop");
    fetchTheLyrics();
  }, [songList]);

  useEffect(()=>{
    console.log(lyricsData);
  } , [lyricsData]);

  function updateList(data) {
    console.log("Updating song list", data);
    setSongList(data);
  }

  return (
    <div>
      <h1>Game Loop Title</h1>
      {lyricsData ? <span>{`${lyricsData.length}${lyricsData[0]}`}</span> : <span>Currently No Lyrics Data</span>}
      <Outlet
        context={{
          testVal: "Balogna",
          songsInfo: songList,
          lyricsData: lyricsData,
          updateSongList: updateList,
        }}
      />
    </div>
  );
}

import React, { useEffect, useState } from 'react'

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

  const [sanitizedLyrics, setSanitizedLyrics] = useState("");
  const [sanitizedTitle, setSanitizedTitle] = useState("");
  const [lines, setLines] = useState([""]);

  useEffect(()=>{
    const regex = new RegExp("[^\\w\\s]", "g"); //Finds all non-word, non-whitespace characters
    setSanitizedLyrics(songData.lyrics.replace(regex, "").toLowerCase());
    setSanitizedTitle(songData.songName.replace(regex, "").toLowerCase());
  }, [songData]);
  
  useEffect(()=>{
    setLines(sanitizedLyrics.split('\n'));
  } , [sanitizedLyrics]);


  //Lyrics Metrics
  /**
   * Count occurences of each line
   * Track lines that come before/after
   * Maybe add a tiebreaker value? Something that tracks how often each word in the line appears in the rest of the lyrics
   * Maybe add contains title value? Might just be a boolean for if any word in the title appears in this line of lyrics
   * fuzzy matching? lucene - elastic search
   * Use all of this data to calculate some difficulty score
   */

  // Regular Expression for finding the '  x3' style things = RegExp(\s{2,}x(\d+)$, '')
  // Regular Expression for finding the '( )  x3' style = RegExp(/\([\s\S]+\)\s{2,}x(\d+)$/, 'g');

  useEffect(()=>{
    console.log("Lyrics changed");

    //Count all the words
    const wordCount = [];
    sanitizedLyrics.split(' ').forEach(word=>{
      if (wordCount[word]) {
        wordCount[word]++;
      }else{
        wordCount[word] = 1;
      }
    });
    console.log(wordCount);

    const ogLyricsLines = songData.lyrics.split("\n");
    const metadata = [];
    lines.forEach((line, index)=>{
      const matchedLine = metadata.find(element => {
        return element.text == line;
      });
      if (matchedLine){
        matchedLine.count++;
      }else{
        //Check if the line uses any words contained in the title
        const exactTitle = line.toLowerCase().includes(sanitizedTitle);
        const isLikeTitle = line.split(' ').some((word)=>sanitizedTitle.includes(word));
        const tieBreak = line.split(' ').reduce((acc, curr)=>{
          return acc += parseInt(wordCount[curr]) || 0;
        }, 0)
        metadata.push({
          count: 1,
          hasTitle: exactTitle,
          likeTitle: isLikeTitle,
          tiebreaker: tieBreak,
          text: ogLyricsLines[index],
        });
      }
    });

    console.log(metadata);
  }, [lines]);

  return (
    <div>
      <ul className="lyrics-ul">
        {lines.map((line, index)=>{
          return <li className="lyrics-line" key={index}>{line}</li>
        })}
      </ul>
    </div>
  )
}

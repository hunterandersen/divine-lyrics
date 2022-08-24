import React, { useEffect, useState } from "react";

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
export default function LyricsBlock({ songData }) {
  const [sanitizedLyrics, setSanitizedLyrics] = useState("");
  const [sanitizedTitle, setSanitizedTitle] = useState("");
  const [ogLyricsLines, setOgLyricsLines] = useState("");
  const [displayLines, setDisplayLines] = useState(["Lyrics still loading"]);

  useEffect(() => {
    console.log(songData);
    if (songData){
      setOgLyricsLines(songData.lyrics.split('\n'));
      const regex = new RegExp("[^\\w\\s]", "g"); //Finds all non-word, non-whitespace characters
      //console.log(songData.lyrics.match(regex));
      setSanitizedLyrics(songData.lyrics.replace(regex, "").toLowerCase());
      setSanitizedTitle(songData.songName.replace(regex, "").toLowerCase());
    }else{
      setDisplayLines([""]);
    }
  }, [songData]);

  // useEffect(() => {
  //   setDisplayLines(sanitizedLyrics.split("\n"));
  // }, [sanitizedLyrics]);

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

  useEffect(() => {
    console.log("Lyrics changed");
    if (sanitizedLyrics.length > 1) {
      console.log(sanitizedLyrics);
      //Count all the words
      const wordCount = [];
      sanitizedLyrics.split(" ").forEach((word) => {
        if (wordCount[word]) {
          wordCount[word]++;
        } else {
          wordCount[word] = 1;
        }
      });
      console.log(wordCount);
      
      const dataBuilder = sanitizedLyrics.split("\n").reduce((dataAccumulator, line, index, linesArr) => {
        //Ignore empty lines
        if (line.length <= 0) return dataAccumulator;
        //Determine if the exact line is repeating
        const matchedLine = dataAccumulator.find((element) => {
          return element.text === ogLyricsLines[index];
        });
        if (matchedLine) {
          matchedLine.count++;
          return dataAccumulator;
        } else {
          //Check if the line uses any words contained in the title
          const exactTitle = line.toLowerCase().includes(sanitizedTitle);
          const isLikeTitle = line
            .split(" ")
            .some((word) => sanitizedTitle.includes(word));
          //Add up all the times each word in the line occurs in the rest of the lyrics
          const tieBreak = line.split(" ").reduce((acc, curr) => {
            return (acc += parseInt(wordCount[curr]) || 0);
          }, 0);
          dataAccumulator.push({
            count: 1,
            hasTitle: exactTitle,
            likeTitle: isLikeTitle,
            tiebreaker: tieBreak,
            text: ogLyricsLines[index],
            prevText: ogLyricsLines[index-1],
            nextText: ogLyricsLines[index+1],
          });
          return dataAccumulator;
        }
      }, []);
      console.log(dataBuilder);

      let chosenLyrics = {
        maxSimplicity: 0,
        index: -1,
      };
      //Calculate simplicity score
      const metadata = dataBuilder.map((data, idx) => {
        let simplicityScore = 0;
        simplicityScore += (data.count - 1) * 2;
        simplicityScore += data.hasTitle ? 3 : 0;
        simplicityScore += data.likeTitle ? 1 : 0;
        //track the simplest item
        if (simplicityScore > chosenLyrics.maxSimplicity || (simplicityScore === chosenLyrics.maxSimplicity && data.tiebreaker > chosenLyrics.tiebreaker)) {
          chosenLyrics.maxSimplicity = simplicityScore;
          chosenLyrics.index = idx;
          chosenLyrics.tiebreaker = data.tiebreaker;
        }
        data.simplicity = simplicityScore;
        return data;
      });

      console.log(metadata);

      //Find easiest lyrics
      let highestSimplicity = Math.max(
        ...metadata.map((data) => data.simplicity)
      );
      console.log(highestSimplicity);
      let easyLyricData = dataBuilder.find(
        (data) => data.simplicity === highestSimplicity
      );
      let easiestLyrics = null;
      if (easyLyricData?.nextText) {
        easiestLyrics = [easyLyricData.text, easyLyricData.nextText];
      } else if (easyLyricData?.prevText) {
        easiestLyrics = [easyLyricData.prevText, easyLyricData.text];
      } else {
        easiestLyrics = [easyLyricData.text];
      }

      console.log(easiestLyrics);

      setDisplayLines(easiestLyrics);
    }
  }, [sanitizedLyrics, sanitizedTitle, ogLyricsLines]);

  return (
    <div>
      <ul className="lyrics-ul">
        {displayLines.map((line, index) => {
          return (
            <li className="lyrics-line" key={index}>
              {line}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import * as Constants from "./API_Constants";

export class APIService {
  static controller = new AbortController();

  /**
   *
   * @param {string} artist Ex: Queen, Metallica, U2
   * @param {string} song Ex: Bohemian Rhapsody, One, One
   * @returns Object>art+mus[]>related AKA an object that holds an array of related songs
   * Will not return lyrics for the original nor any of the related songs
   */
  static async getRelatedSongList(artist, song) {
    if (!artist || !song) return null;
    let searchParams = `${Constants.VL_SEARCH_ENDPOINT}art=${artist}&mus=${song}&nolyrics=1&${Constants.VL_RELATED_SONGS}&${process.env.REACT_APP_PUBLIC_KEY}`;
    //Call the API to get a list of related songs
    return fetch(`${Constants.VL_BASE_URL}${searchParams}`, {
      signal: this.controller.signal,
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        return null;
      });
  }

  static async getLyrics(id, artist, song) {
    if (!id && !(artist && song)) return null;
    let searchParams = "";
    if (id) {
      searchParams = `${Constants.VL_SEARCH_ENDPOINT}musid=${id}&${process.env.REACT_APP_PUBLIC_KEY}`;
    } else if (artist && song) {
      searchParams = `${Constants.VL_SEARCH_ENDPOINT}art=${artist}&mus=${song}&${process.env.REACT_APP_PUBLIC_KEY}`;
    }
    //Call the API to get the object with lyrics
    return fetch(`${Constants.VL_BASE_URL}${searchParams}`, {
      signal: this.controller.signal,
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        return null;
      });
  }
}

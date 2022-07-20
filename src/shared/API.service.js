import * as Constants from "./API_Constants";

export class APIService {
  static controller = new AbortController();

  /**
   *
   * @param {Artist's name} artist Ex:Queen, Metallica, U2
   * @param {Song Name} song Ex:Bohemian Rhapsody, One, One
   * @returns Object>art+mus[]>related AKA an object that holds an array of related songs
   * Will not return lyrics for the original nor any of the related songs
   */
  static async getSongList(artist, song) {
    if (!artist || !song) return null;
    let searchParams = `${Constants.VL_SEARCH_ENDPOINT}art=${artist}&mus=${song}&nolyrics=1&${Constants.VL_RELATED_SONGS}&${Constants.VL_API_KEY}`;
    console.log("Fetching, ", `${Constants.VL_BASE_URL}${searchParams}`);
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

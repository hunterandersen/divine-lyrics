# Divine Lyrics
*powered by Vagalume API*
## Frontend Views
- [ ] Home
- [x] Genre selection page
    - [ ] Game difficulty selection
- [x] Gameplay Round
    - [x] Current Song Guess
- [ ] End Round Recap
- [ ] User score/highlight

## API Requests
- [x] Get a list of song tracks based on genre (maybe artist w/ similar artists)
- [x] Get lyrics for each track

# Future Additions
## Multiplayer
- Simultaneous multiplayer functionality
    - 2+ users join a lobby
    - They compete via accuracy and/or time

## Hot Load Lyrics
Change the lyrics fetching so that it doesn't wait (Promise.all) for all the promises to resolve. Instead check if there's something like Promise.any so that my user can start playing the round as soon as even one song lyric resolves successfully

Though it could introduce a bad player experiece in the case that one resolves quickly, but the rest don't resolve successfully. Then I wouldn't have enough lyrics to generate a full round that the user expects
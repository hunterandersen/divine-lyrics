import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RoundCurator from "./optionsMenu/RoundCurator";
import GameRound from "./gamePlay/GameRound";
import GameLoop from "./gameLoop/GameLoop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game" element={<GameLoop />}>
          <Route path="/game/round" element={<GameRound />} />
          <Route path="/game/options" element={<RoundCurator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/**
 * Parent
 *  ListCurator
 *  GameRound
 * End Parent
 */

/**
 * Option 1:
 *    Raise state up to App level so that both components can access it
 * 
 * Option 1.5:
 *    Use an outlet
 * 
 * Option 2:
 *    Make one component a child of the other component
 * 
 * Option 3:
 *    Link from one to the other, and pass the data as a query param
 *    I don't like this because it makes cheating much easier
 */
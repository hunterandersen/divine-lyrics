import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RoundCurator from "./gameLoop/optionsMenu/RoundCurator";
import GameRound from "./gameLoop/gamePlay/GameRound";
import GameLoop from "./gameLoop/GameLoop";
import Home from "./HomeView/Home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
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
 * Fly By Night, by Rush
 * only gives 8 related songs back
 */
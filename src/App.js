import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ListCurator from "./optionsMenu/ListCurator";
import GameRound from "./gamePlay/GameRound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/play" element={<GameRound />} />
        <Route path="/" element={<ListCurator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

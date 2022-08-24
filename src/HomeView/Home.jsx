import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex-column">
      <h1 className="title-main">Divine Lyrics</h1>
      <p>Test your lyrical divination abilities! Hop in and have some fun!</p>
      <Link className="button" to="game/options">Play Now</Link>
    </div>
  );
}

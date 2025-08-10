// Scoreboard Component: Displays the current and best scores.
const Scoreboard = ({ currentScore, bestScore }) => {
  return (
    <div className="scoreboard">
      <h1>Pokémon Memory Game</h1>
      <div className="scoreboard-scores">
        <p>分数: <span className="score">{currentScore}</span></p>
        <p>最高分: <span className="best-score">{bestScore}</span></p>
      </div>
    </div>
  );
};

export default Scoreboard;
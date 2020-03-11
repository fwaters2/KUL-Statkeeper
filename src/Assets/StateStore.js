import React from "react";
import Router from "../Components/Router";
import GameContext from "../Assets/GameContext";

export default function StateStore() {
  const [page, setPage] = React.useState("Schedule");
  const [matchData, setMatchData] = React.useState({});

  const gameState = {
    page,
    setPage,
    matchData,
    setMatchData
  };

  return (
    <GameContext.Provider value={gameState}>
      <Router />
    </GameContext.Provider>
  );
}

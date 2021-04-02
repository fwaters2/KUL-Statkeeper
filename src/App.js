import React from "react";
import GameContext from "./Assets/GameContext";
import GameContainer from "./Components/Game/GameContainer";
import ScheduleContainer from "./Components/Schedule/ScheduleContainer";
import MatchProvider from "./Contexts/MatchContext";
import ScheduleProvider from "./Contexts/ScheduleContext";

export default function App() {
  const [page, setPage] = React.useState("Schedule");
  const [matchData, setMatchData] = React.useState({});

  const gameState = {
    page,
    setPage,
    matchData,
    setMatchData,
  };

  const Router = () => {
    switch (page) {
      case "Schedule":
        return (
          <ScheduleProvider>
            <ScheduleContainer />
          </ScheduleProvider>
        );
      case "Game":
        return (
          <MatchProvider>
            <GameContainer />
          </MatchProvider>
        );
      default:
        return <div>Page not found: Yell at Forrest</div>;
    }
  };

  return (
    <GameContext.Provider value={gameState}>
      <Router />
    </GameContext.Provider>
  );
}

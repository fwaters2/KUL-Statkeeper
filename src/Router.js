import React, { useContext } from "react";
import GameContainer from "./Components/Game/GameContainer";
import ScheduleContainer from "./Components/Schedule/ScheduleContainer";
import { AppContext } from "./Contexts/AppContext";
import MatchProvider from "./Contexts/MatchContext";
import ScheduleProvider from "./Contexts/ScheduleContext";

const Router = () => {
  const { page } = useContext(AppContext);

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

export default Router;

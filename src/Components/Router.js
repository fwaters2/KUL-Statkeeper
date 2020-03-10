import React from "react";
import TableView from "./Backend/TableView";
import DTableView from "./Backend/DTableView";
import ScheduleContainer from "./Schedule/ScheduleContainer";
import GameContainer from "./Game/GameContainer";
import GameContext from "../Assets/GameContext";

export default function Router() {
  const MatchContext = React.useContext(GameContext);
  const { page } = MatchContext;

  switch (page) {
    case "Schedule":
      return <ScheduleContainer />;
    case "Game":
      return <GameContainer />;
    case "TableView":
      return <TableView />;
    case "DTableView":
      return <DTableView />;
    default:
      return <div>Page not found: Yell at Forrest</div>;
  }
}

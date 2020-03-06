import React from "react";
import TableView from "./Backend/TableView";
import DTableView from "./Backend/DTableView";
import PlayoffContainer from "./Statkeeper/PlayoffContainer";
import ScheduleContainer from "./Schedule/ScheduleContainer";

export default function Router(props) {
  const { scheduleData, gameData, setGameData, handleGameChoice } = props;
  const [page, setPage] = React.useState("Schedule");
  switch (page) {
    case "Schedule":
      return (
        //Switch back to 'Games' next season
        <ScheduleContainer
          scheduleData={scheduleData}
          setPage={setPage}
          gameData={gameData}
          setGameData={setGameData}
          handleGameChoice={handleGameChoice}
        />
      );
    case "Game":
      return <PlayoffContainer gameData={gameData} setPage={setPage} />;
    case "TableView":
      return <TableView setPage={setPage} />;
    case "DTableView":
      return <DTableView setPage={setPage} />;
    default:
      return <div>Page not found: Yell at Forrest</div>;
  }
}

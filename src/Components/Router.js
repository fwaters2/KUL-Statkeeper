import React from "react";
import Games from "./Schedule/Games";
import GameContainer from "./Statkeeper/GameContainer";
import TableView from './Backend/TableView'
import DTableView from './Backend/DTableView'

export default function Router(props) {
  const { scheduleData, gameData, setGameData, handleGameChoice } = props;
  const [page, setPage] = React.useState("Schedule");
  switch (page) {
    case "Schedule":
      return (
        <Games
          scheduleData={scheduleData}
          setPage={setPage}
          gameData={gameData}
          setGameData={setGameData}
          handleGameChoice={handleGameChoice}
        />
      );
    case "Game":
      return <GameContainer gameData={gameData} setPage={setPage} />;
      case "TableView":
        return <TableView setPage={setPage}/>
        case "DTableView":
            return <DTableView setPage={setPage}/>
  }
}

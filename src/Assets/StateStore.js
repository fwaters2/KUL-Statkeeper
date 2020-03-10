import React from "react";
import Router from "../Components/Router";
import PlayoffSched from "./PlayoffsSched.json";
import GameContext from "../Assets/GameContext";

//import "./OfflineData/players.json";
//import "./OfflineData/schedule.json";

//const players = require("./OfflineData/players.json");
//const schedule = require("./OfflineData/schedule.json");

export default function StateStore() {
  const [page, setPage] = React.useState("Schedule");
  const [scheduleData, setSchedule] = React.useState(PlayoffSched);
  const [matchData, setMatchData] = React.useState({});
  const [playerData, setPlayers] = React.useState([]);
  const [gameData, setGameData] = React.useState({});

  const handleGameChoice = (homeTeam, awayTeam, GameNO, title, id, data) => {
    const homeRoster = playerData.filter(player => player.Team === homeTeam);
    const awayRoster = playerData.filter(player => player.Team === awayTeam);
    setGameData({
      title: title,
      homeTeam: homeTeam,
      homeRoster: homeRoster,
      awayTeam: awayTeam,
      awayRoster: awayRoster,
      GameNO: GameNO,
      id: id,
      data: data
    });
  };

  const gameState = {
    page,
    setPage,
    matchData,
    setMatchData,
    ds: [
      {
        id: "some id",
        match_id: "DJ4Mv3nC7PRdldmFkAEJ",
        teamColor: "#AE1567",
        D: "#17 Mike Smith",
        timestamp: "some time"
      }
    ],
    points: [
      {
        id: "some id",
        match_id: "DJ4Mv3nC7PRdldmFkAEJ",
        teamColor: "#AE1567",
        assist: "#4 Matus Peciar",
        goal: "#17 Mike Smith"
      }
    ]
  };

  return (
    <GameContext.Provider value={gameState}>
      <Router
        scheduleData={scheduleData}
        gameData={gameData}
        setGameData={setGameData}
        //handleGameChoice={handleGameChoice}
      />
    </GameContext.Provider>
  );
}

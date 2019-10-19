import React from "react";
import Router from "./Router";
import "./Rosters.json";
import "./players.json";
import "./Teams.json";

const Rosters = require("./Rosters.json");
const players = require("./players.json");
const teams = require("./Teams.json");

export default function StateStore() {
  const [season, setSeason] = React.useState("Spring 2019");
  const [gameData, setGameData] = React.useState({});
  const handleGameChoice = (homeTeam, awayTeam) => {
    const currentPlayers = Rosters.filter(player => player.season === season);

    const rosterNames = currentPlayers.map(index => {
      const playerNames = players.find(
        player => player.playerID === index.playerID
      );
      const name = playerNames.firstName + " " + playerNames.lastName;
      const team = teams.find(team => team.teamID === index.teamID).team;
      return {
        name: name,
        team: team
      };
    });
    const homeRoster = rosterNames.filter(player => player.team === homeTeam);
    const awayRoster = rosterNames.filter(player => player.team === awayTeam);
    setGameData({
      homeTeam: homeTeam,
      homeRoster: homeRoster,
      awayTeam: awayTeam,
      awayRoster: awayRoster
    });
  };

  const currentPlayers = Rosters.filter(player => player.season === season);

  const currentPlayerNames = currentPlayers.map(index => {
    const playerNames = players.find(
      player => player.playerID === index.playerID
    );

    const name = playerNames.firstName + " " + playerNames.lastName;
    const team = teams.find(team => team.teamID === index.teamID).team;
    return {
      name: name,
      team: team
    };
  });

  return (
    <Router
      gameData={gameData}
      setGameData={setGameData}
      handleGameChoice={handleGameChoice}
    />
  );
}

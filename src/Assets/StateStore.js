import React from "react";
import Firestore from "../Utils/Firebase2";
import Router from "../Components/Router";
import PlayoffSched from "./PlayoffsSched.json";
import GameContext from "../Assets/GameContext";

//import "./OfflineData/players.json";
//import "./OfflineData/schedule.json";

//const players = require("./OfflineData/players.json");
//const schedule = require("./OfflineData/schedule.json");

export default function StateStore() {
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

  React.useEffect(() => {
    let homeRoster = [];

    if (matchData !== {}) {
      Firestore.firestore()
        .collection("rosters")
        .where("season_id", "==", "SqKVBY9JmikfIV8JzoG4") //to-do, make this dynamic
        //get ids of players that are on this team_id
        .where(
          "team_id",
          "==",
          matchData === {} ? matchData.homeTeamData.id : "2udXyZFT0bgnRqxs4XKU"
        ) //        matchData.homeTeamData.id)
        .get()
        .then(docs => {
          let homeIds = [];
          docs.forEach(
            doc => (homeIds = [...homeRoster, doc.data().player_id])

            //(homeRoster = [...homeRoster, doc.data().player_id])
          );
          console.log("docs", docs);
          console.log(homeIds);
        });
      // .then(
      //   console.log(
      //     "in effect",
      //     homeRoster
      //     // .map(playerId =>
      //     //   Firestore.firestore()
      //     //     .collection("player")
      //     //     .doc(playerId)
      //     // )
      //   )
      // );
    }
    // const player = snapshot.docs.map(doc => ({
    //   id: doc.id,
    //   ...doc.data()
    // }));
    // setPlayers(
    //   player.sort((a, b) => {
    //     if (a.Name < b.Name) {
    //       return -1;
    //     }
    //     if (a.Name > b.Name) {
    //       return 1;
    //     }
    //     return 0;
    //   })
    // );
  }, [matchData]);

  const gameState = {
    matchData,
    setMatchData
  };

  return (
    <GameContext.Provider value={gameState}>
      {console.log("matchData in component", matchData)}
      <Router
        scheduleData={scheduleData}
        gameData={gameData}
        setGameData={setGameData}
        handleGameChoice={handleGameChoice}
      />
    </GameContext.Provider>
  );
}

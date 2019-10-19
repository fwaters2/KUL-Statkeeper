import React from "react";
import Firestore from "../Utils/Firebase";
import Router from '../Components/Router'
import "./OfflineData/players.json"
import "./OfflineData/schedule.json"

const players = require("./OfflineData/players.json");
const schedule = require("./OfflineData/schedule.json");

export default function StateStore() {
  const [scheduleData, setSchedule] = React.useState([]);
  const [playerData, setPlayers] = React.useState([]);
  const [gameData, setGameData] = React.useState({});

  const handleGameChoice = (homeTeam, awayTeam, GameNO) => {
    const homeRoster = playerData.filter(player => player.Team === homeTeam);
    const awayRoster = playerData.filter(player => player.Team === awayTeam);
    setGameData({
      homeTeam: homeTeam,
      
      homeRoster: homeRoster,
      awayTeam: awayTeam,
     
      awayRoster: awayRoster,
      GameNO:GameNO
    });
  };

  React.useEffect(() => {
    const unsubscribe = 
    // setSchedule(schedule);
    // setPlayers(players);

    //  //change placeholder to newdata
    //  placeholder.map(x=>
    // Firestore
    //   .firestore()
    //   .collection("placeholder")
    //   .add(x).then(function() {
    //     console.log("Document successfully written!");
    // })
    // .catch(function(error) {
    //     console.error("Error writing document: ", error);
    // }))

   //place to take data when it goes live
    Firestore
      .firestore()
      .collection("Schedule")
      .onSnapshot(snapshot => {
        const games = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSchedule(games);
      });
    Firestore
      .firestore()
      .collection("Players")
      .onSnapshot(snapshot => {
        const player = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPlayers(player);
      });

    return () => unsubscribe;
  }, []);
  return (
    <Router
      scheduleData={scheduleData}
      gameData={gameData}
      setGameData={setGameData}
      handleGameChoice={handleGameChoice}
    />
  );
}

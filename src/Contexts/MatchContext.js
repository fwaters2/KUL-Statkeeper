import React, { createContext, useContext, useEffect, useState } from "react";
import { playersRef, rosterRef } from "../Assets/firestoreCollections";
import GameContext from "../Assets/GameContext";
import { createFBArray, createFBObject } from "../Utils/general_utils";
import {
  getPlayerIdsFromRoster,
  populatePlayerData,
} from "../Utils/match_utils";

export const MatchContext = createContext();

const MatchProvider = ({ children }) => {
  const { matchData } = useContext(GameContext);
  const [loadingPlayerData, toggleLoadingPlayerData] = useState(true);
  const [playersData, setPlayerData] = useState();
  const [homeRoster, setHomeRoster] = useState([]);
  const [awayRoster, setAwayRoster] = useState([]);

  const { id, awayScore, homeScore, homeTeamData, awayTeamData } = matchData;
  const awayId = awayTeamData.id;
  const awayTeam = awayTeamData.name;
  const awayColor = awayTeamData.colorPrimary;

  const homeId = homeTeamData.id;
  const homeTeam = homeTeamData.name;
  const homeColor = homeTeamData.colorPrimary;

  // Get All Player Data
  useEffect(() => {
    playersRef.get().then((data) => {
      const playersObj = createFBObject(data);
      setPlayerData(playersObj);
      toggleLoadingPlayerData(false);
    });
  }, []);

  // Get Roster Ids
  useEffect(() => {
    if (loadingPlayerData) {
      return;
    }
    rosterRef
      .where("team_id", "in", [homeId, awayId])
      .get()
      .then((data) => {
        const rosterArray = createFBArray(data);
        const homeTeamRosterIds = getPlayerIdsFromRoster(rosterArray, homeId);
        const awayTeamRosterIds = getPlayerIdsFromRoster(rosterArray, awayId);

        const homeRoster = homeTeamRosterIds.map((id) =>
          populatePlayerData(playersData, id)
        );
        const awayRoster = awayTeamRosterIds.map((id) =>
          populatePlayerData(playersData, id)
        );
        setHomeRoster(homeRoster);
        setAwayRoster(awayRoster);
      });
  }, [homeId, awayId, playersData, loadingPlayerData]);

  const currentMatchData = {
    id,
    awayScore,
    awayTeamData: {
      id: awayId,
      name: awayTeam,
      colorPrimary: awayColor,
      roster: awayRoster,
    },
    homeScore,
    homeTeamData: {
      id: homeId,
      name: homeTeam,
      colorPrimary: homeColor,
      roster: homeRoster,
    },
  };

  return (
    <MatchContext.Provider value={currentMatchData}>
      {children}
    </MatchContext.Provider>
  );
};

export default MatchProvider;

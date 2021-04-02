import React, { createContext, useContext, useEffect, useState } from "react";
import { rosterRef } from "../Assets/firestoreCollections";
import { AppContext } from "./AppContext";
import { createFBArray } from "../Utils/general_utils";
import {
  getPlayerIdsFromRoster,
  populatePlayerData,
} from "../Utils/match_utils";

export const MatchContext = createContext();

const MatchProvider = ({ children }) => {
  const { matchData, playerData } = useContext(AppContext);
  const { id, awayScore, homeScore, homeTeamData, awayTeamData } = matchData;

  const [homeRoster, setHomeRoster] = useState([]);
  const [awayRoster, setAwayRoster] = useState([]);

  const awayId = awayTeamData.id;
  const awayTeam = awayTeamData.name;
  const awayColor = awayTeamData.colorPrimary;

  const homeId = homeTeamData.id;
  const homeTeam = homeTeamData.name;
  const homeColor = homeTeamData.colorPrimary;

  // Get Roster Ids
  useEffect(() => {
    rosterRef
      .where("team_id", "in", [homeId, awayId])
      .get()
      .then((data) => {
        const rosterArray = createFBArray(data);
        const homeTeamRosterIds = getPlayerIdsFromRoster(rosterArray, homeId);
        const awayTeamRosterIds = getPlayerIdsFromRoster(rosterArray, awayId);

        const homeRoster = homeTeamRosterIds.map((id) =>
          populatePlayerData(playerData, id)
        );
        const awayRoster = awayTeamRosterIds.map((id) =>
          populatePlayerData(playerData, id)
        );
        setHomeRoster(homeRoster);
        setAwayRoster(awayRoster);
      });
  }, [homeId, awayId, playerData]);

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

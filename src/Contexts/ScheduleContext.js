import { createContext, useEffect, useState } from "react";
import {
  completedGamesRef,
  currentSeasonRef,
  matchesRef,
  resultRef,
  standingsRef,
  teamsRef,
} from "../Assets/firestoreCollections";
import { createFBObject, createFBArray } from "../Utils/general_utils";
import { getClosestDate } from "../Utils/schedule_utils";

export const ScheduleContext = createContext();

const ScheduleProvider = ({ children }) => {
  const [finishedGames, setFinishedGames] = useState([]);
  const [results, setResults] = useState({});
  const [standings, setStandings] = useState({});
  const [teamData, setTeamData] = useState({});
  const [allDates, setAllDates] = useState([]);
  const [currentDate, setCurrentDate] = useState({
    weekNum: 1,
    date: "Loading...",
  });
  const [matches, setMatches] = useState([]);

  // Get All Dates from season doc
  useEffect(() => {
    currentSeasonRef.get().then((doc) => {
      const data = doc.data();
      const dates = data.dates.map((date) => {
        return date.toDate();
      });
      setAllDates(dates);
      const closestDate = getClosestDate(dates);
      setCurrentDate(closestDate);
    });
  }, []);

  // Get Team Data
  // {[teamid]:{colorPrimary, name, seasons, uid}}
  useEffect(() => {
    teamsRef.get().then((data) => {
      const fbObject = createFBObject(data);
      setTeamData(fbObject);
    });
  }, []);

  // Get Standings for buttons
  useEffect(() => {
    standingsRef.get().then((data) => {
      const fbObject = createFBObject(data);
      setStandings(fbObject);
    });
  }, []);

  // Get Current Results for Matches
  useEffect(() => {
    resultRef.get().then((data) => {
      const fbObject = createFBObject(data);
      setResults(fbObject);
    });
  }, []);

  // Get Data for Completed Games
  useEffect(() => {
    completedGamesRef.get().then(({ docs }) => {
      const fbArray = createFBArray(docs);
      setFinishedGames(fbArray);
    });
  }, []);

  // Get Matches for current Date
  useEffect(() => {
    matchesRef.get().then((data) => {
      const fbArray = createFBArray(data);
      setMatches(fbArray);
    });
  }, []);

  const scheduleData = {
    standings,
    finishedGames,
    teamData,
    currentDate,
    allDates,
    setCurrentDate,
    matches,
    results,
  };

  return (
    <ScheduleContext.Provider value={scheduleData}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleProvider;

import moment from "moment";
import { PLAYERS_COL } from "../../Assets/firestoreCollections";
import firebase2 from "../../Utils/Firebase2";
import {
  MATCHES_COL,
  RESULTS_COL,
  ROSTERS_COL,
  TEAMS_COL,
} from "../../Assets/firestoreCollections";

export const getClosestDate = (dates) => {
  const now = moment();
  let closest = Infinity;
  let closestDate = null;
  let weekNum = 0;

  dates.forEach((d, index) => {
    const date = moment(d, "MMMM Do YYYY");
    if (Math.abs(now.diff(date, "days")) < closest) {
      closest = now.diff(date, "days");
      weekNum = index + 1;
      closestDate = d;
    }
  });
  const currentDate = { weekNum, date: closestDate };

  return currentDate;
};
export const getMatches = getFirebaseArray(MATCHES_COL);

export function fetchData(currentDate) {
  const getResults = getFirebaseObject(RESULTS_COL);
  const getTeams = getFirebaseObject(TEAMS_COL);
  const getRosters = getFirebaseArray(ROSTERS_COL);

  return Promise.all([
    getMatches,
    getTeams,
    getRosters,
    getPlayerData(),
    getResults,
  ])
    .then((values) => {
      const [matches, teams, rosters, playerData, results] = values;
      let dateArray = getDates(matches);
      let uniqueDates = getUnique(dateArray);

      // const closestDate = getClosestDate(uniqueDates);

      // const dateIWant = closestDate.date;

      let betterMatchData = parseMatchData(
        matches,
        teams,
        rosters,
        playerData,
        results,
        currentDate
      );
      const allTimes = betterMatchData.map((x) => x.time);

      let uniqueTimes = getUnique(allTimes).sort();

      let data = {
        uniqueDates,
        uniqueTimes,
        betterMatchData,
      };
      return data;
    })
    .catch((x) => console.log("error", x));
}

export function getDates(matches) {
  const byDate = (x, y) => {
    if (moment(x.datetime.toDate()).isBefore(y.datetime.toDate())) {
      return -1;
    } else {
      return 1;
    }
  };

  return matches
    .sort(byDate)
    .map((x) => moment(x.datetime.toDate()).format("MMMM Do YYYY"));
}

export function getPlayerData() {
  let playerData = {};
  return firebase2
    .firestore()
    .collection(PLAYERS_COL)
    .get()
    .then((querySnapshot) => {
      console.groupCollapsed("Players");
      querySnapshot.forEach((doc) => {
        console.log("player: ", doc.data());
        playerData = {
          ...playerData,
          [doc.id]: {
            id: doc.id,
            player: `${doc.data().first_name} ${doc.data().last_name}`,
            jerseyNum: doc.data().jerseyNum,
            jerseyBack: doc.data().jerseyBack,
            nickname: doc.data().nickname,
            photo: doc.data().photo,
            chName: doc.data().ch_name,
          },
        };
        console.count("players");
      });
      console.groupEnd();
      return playerData;
    });
}
export function getFirebaseArray(name) {
  let newArray = [];

  return firebase2
    .firestore()
    .collection(name)
    .get()
    .then((docs) => {
      console.groupCollapsed(name);
      docs.forEach((doc) => {
        newArray = [...newArray, { id: doc.id, ...doc.data() }];
        console.count(name);
      });
      console.groupEnd();
      return newArray;
    });
}

export function getFirebaseObject(name) {
  let objectData = {};
  return firebase2
    .firestore()
    .collection(name)
    .get()
    .then((querySnapshot) => {
      console.groupCollapsed(name);
      querySnapshot.forEach((doc) => {
        objectData = {
          ...objectData,
          [doc.id]: doc.data(),
        };
        console.log(objectData);
        console.count(name);
      });
      console.groupEnd();
      return objectData;
    });
}

export function getUnique(array) {
  const uniqueArray = Array.from(new Set(array));
  return uniqueArray;
}

function getMatchDate(datetime) {
  return moment(datetime.toDate()).format("MMMM Do YYYY");
}
function getMatchTime(datetime) {
  return moment(datetime.toDate()).format("LT");
}

function getPoints(id, results, team) {
  return results[id] ? results[id][team] : "";
}
function getRosterIds(rosters, teamId, playerData) {
  return rosters
    .filter((x) => x.team_id === teamId)
    .map((y) => playerData[y.player_id]);
}

function getTeamData(teamId, teams, rosters, playerData) {
  const teamData = {
    id: teamId,
    name: teams[teamId].name,
    colorPrimary: teams[teamId].colorPrimary,
    colorSecondary: teams[teamId].colorSecondary,
    roster: getRosterIds(rosters, teamId, playerData),
  };
  return teamData;
}

export function parseMatchData(
  matches,
  teams,
  rosters,
  playerData,
  results,
  dateIWant
) {
  return matches
    .filter((x) => getMatchDate(x.datetime) === dateIWant.date)
    .map((game) => {
      const { datetime, id, team_home, team_away } = game;
      const data = {
        id: id,
        day: getMatchDate(datetime),
        time: getMatchTime(datetime),
        homeScore: getPoints(id, results, "homePts"),
        awayScore: getPoints(id, results, "awayPts"),
        homeTeamData: getTeamData(team_home, teams, rosters, playerData),
        awayTeamData: getTeamData(team_away, teams, rosters, playerData),
      };
      return data;
    });
}

const schedule_utils = { getFirebaseArray, getFirebaseObject };

export default schedule_utils;

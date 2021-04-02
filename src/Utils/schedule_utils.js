import moment from "moment";

import { getUnique } from "./general_utils";

export const getClosestDate = (dates) => {
  const now = moment();
  let closest = Infinity;
  let closestDate = null;
  let weekNum = 0;

  dates.forEach((d, index) => {
    const date = moment(d);
    if (Math.abs(now.diff(date, "days")) < closest) {
      closest = now.diff(date, "days");
      weekNum = index + 1;
      closestDate = date.format("MMMM Do YYYY");
    }
  });
  const currentDate = { weekNum, date: closestDate };

  return currentDate;
};
export function getMatchDate(datetime) {
  return moment(datetime).format("MMMM Do YYYY");
}
export function getMatchTime(datetime) {
  return moment(datetime).format("LT");
}

function getPoints(id, results, team) {
  return results[id] ? results[id][team] : "";
}
function getTeamData(teamId, teams) {
  const teamData = {
    id: teamId,
    name: teams[teamId].name,
    colorPrimary: teams[teamId].colorPrimary,
  };
  return teamData;
}

export function getTodaysMatches(matches, dateIWant) {
  const todaysMatches = matches.filter((x) => {
    return getMatchDate(x.datetime.toDate()) === dateIWant.date;
  });
  return todaysMatches;
}

export function getUniqueTimes(matches, dateIWant) {
  const allTimes = getTodaysMatches(matches, dateIWant).map((match) =>
    getMatchTime(match.datetime.toDate())
  );
  return getUnique(allTimes).sort();
}

export function parseMatchData(dateIWant, matches, teams, results) {
  return getTodaysMatches(matches, dateIWant).map((game) => {
    const { datetime, id, team_home, team_away } = game;
    const data = {
      id: id,
      day: getMatchDate(datetime.toDate()),
      time: getMatchTime(datetime.toDate()),
      homeScore: getPoints(id, results, "homePts"),
      awayScore: getPoints(id, results, "awayPts"),
      homeTeamData: getTeamData(team_home, teams),
      awayTeamData: getTeamData(team_away, teams),
    };
    return data;
  });
}

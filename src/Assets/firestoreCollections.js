import firebase2 from "../Utils/Firebase2";

const firestore = firebase2.firestore();

export const CURRENT_SEASON_ID = "4s0LJvkm0KjHKQziof7a";

export const PLAYERS_COL = "21SpringPlayers";
export const MATCHES_COL = "21SpringMatches";
export const RESULTS_COL = "21SpringResults";
export const COMPLETED_GAMES_COL = "21SpringCompletedGames";
export const STANDINGS_COL = "21SpringStandings";
export const SEASON_STATS_COL = "21SpringSeasonStats";
export const TEAMS_COL = "teams";
export const ROSTERS_COL = "21SpringRosters";

export const POINTS_COL = "21SpringPoints";
export const POINT_EVENTS_COL = "21SpringPointEvents";
export const MATCH_EVENTS_COL = "21SpringMatchEvents";

export const FANTASY_PICKS_COL = "21SpringFantasyPicks";
export const FANTASY_SUBSCORES_COL = "21SpringFantasySubscores";
export const FANTASY_USERS_COL = "21SpringFantasyUsers";
export const DEADLINES_COL = "21SpringDeadlines";
export const PICKS_COL = "21SpringPicks";

export const currentSeasonRef = firestore
  .collection("seasons")
  .doc(CURRENT_SEASON_ID);

export const pointUIRef = firestore.collection("21SpringPointsScorekeeper");
export const pointDBRef = firestore.collection(POINTS_COL);
export const assistDBRef = firestore.collection(POINT_EVENTS_COL);

export const dBDRef = firestore.collection(MATCH_EVENTS_COL);
export const dUIRef = firestore.collection("21SpringDsScorekeeper");

export const rosterRef = firestore.collection(ROSTERS_COL);
export const playersRef = firestore.collection(PLAYERS_COL);
export const matchesRef = firestore.collection(MATCHES_COL);
export const teamsRef = firestore.collection(TEAMS_COL);
export const standingsRef = firestore.collection(STANDINGS_COL);
export const resultRef = firestore.collection(RESULTS_COL);
export const completedGamesRef = firestore.collection(COMPLETED_GAMES_COL);
export const matchEventsRef = firestore.collection(MATCH_EVENTS_COL);

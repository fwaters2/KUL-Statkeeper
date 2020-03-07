import React from "react";
const GameContext = React.createContext(null);
export default GameContext;

//          id: game.id,
//           day: moment(game.datetime.toDate()).format("MMMM Do YYYY"),
//           time: moment(game.datetime.toDate()).format("LT"),
//           homeTeamData: {
//             id: game.team_home,
//             name: values[1][game.team_home].team,
//             colorPrimary: values[1][game.team_home].colorPrimary,
//             colorSecondary: values[1][game.team_home].colorSecondary
//           },
//           awayTeamData: {
//             id: game.team_away,
//             name: values[1][game.team_away].team,
//             colorPrimary: values[1][game.team_away].colorPrimary,
//             colorSecondary: values[1][game.team_away].colorSecondary
//           },
//           teamHome: values[1][game.team_home].team,
//           teamAway: values[1][game.team_away].team,
//           homeColorPrimary: values[1][game.team_home].colorPrimary,
//           homeColorSecondary: values[1][game.team_home].colorSecondary,
//           awayColorPrimary: values[1][game.team_away].colorPrimary,
//           awayColorSecondary: values[1][game.team_away].colorSecondary

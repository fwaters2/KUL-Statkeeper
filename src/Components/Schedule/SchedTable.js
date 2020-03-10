import React from "react";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import SchedButton from "./SchedButton";
import firebase2 from "../../Utils/Firebase2";
import moment from "moment";

export default function SchedTable(props) {
  const { setPage, handleGameChoice } = props;
  const [currentDay, setCurrentDay] = React.useState(null);
  const [currentTimes, setCurrentTimes] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [isLoading, toggleLoading] = React.useState(true);

  React.useEffect(() => {
    let matches = [];

    const getMatches = firebase2
      .firestore()
      .collection("matches")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          matches = [...matches, { id: doc.id, ...doc.data() }];
        });
        return matches;
      });
    let teamData = {};
    const getTeams = firebase2
      .firestore()
      .collection("teams")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          teamData = {
            ...teamData,
            [doc.id]: {
              team: doc.data().name,
              colorPrimary: doc.data().colorPrimary,
              colorSecondary: doc.data().colorSecondary
            }
          };
        });
        return teamData;
      });
    let rosterData = [];
    const getRosters = firebase2
      .firestore()
      .collection("rosters")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          rosterData = [
            ...rosterData,
            {
              teamId: doc.data().team_id,
              playerId: doc.data().player_id
            }
          ];
        });
        return rosterData;
      });

    let playerData = {};
    const getPlayerData = firebase2
      .firestore()
      .collection("players")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          playerData = {
            ...playerData,
            [doc.id]: {
              id: doc.id,
              player: `${doc.data().first_name} ${doc.data().last_name}`,
              nickname: doc.data().nickname,
              photo: doc.data().photo,
              chName: doc.data().ch_name
            }
          };
        });
        return playerData;
      });
    let points = [];
    const getPoints = firebase2
      .firestore()
      .collection("pointsScorekeeper")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          points = [
            ...points,
            {
              id: doc.id,
              teamColor: doc.data().team_id,
              Assist: doc.data().Assist,
              Goal: doc.data().Goal
            }
          ];
        });
        return points;
      });
    let ds = [];
    const getDs = firebase2
      .firestore()
      .collection("dsScoreKeeper")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          ds = [
            ...ds,
            {
              id: doc.id,
              teamColor: doc.data().team_id,
              d: doc.data().Assist
            }
          ];
        });
        return points;
      });

    Promise.all([
      getMatches,
      getTeams,
      getRosters,
      getPlayerData,
      getPoints,
      getDs
    ])
      .then(values => {
        let betterMatchData = values[0].map(game => ({
          id: game.id,
          day: moment(game.datetime.toDate()).format("MMMM Do YYYY"),
          time: moment(game.datetime.toDate()).format("LT"),
          homeTeamData: {
            id: game.team_home,
            name: values[1][game.team_home].team,
            colorPrimary: values[1][game.team_home].colorPrimary,
            colorSecondary: values[1][game.team_home].colorSecondary,
            roster: values[2]
              .filter(x => x.teamId === game.team_home)
              .map(y => values[3][y.playerId])
          },
          awayTeamData: {
            id: game.team_away,
            name: values[1][game.team_away].team,
            colorPrimary: values[1][game.team_away].colorPrimary,
            colorSecondary: values[1][game.team_away].colorSecondary,
            roster: values[2]
              .filter(x => x.teamId === game.team_away)
              .map(y => values[3][y.playerId])
          },
          points: values[4],
          ds: values[5]
        }));
        //let uniqueDates = Array.from(new Set(betterMatchData.map(x => x.day)));
        let uniqueDates = Array.from(new Set(betterMatchData.map(x => x.day)));
        let dateIWant = uniqueDates[1];
        setCurrentDay(dateIWant);
        let uniqueTimes = Array.from(
          new Set(
            betterMatchData.filter(y => y.day === dateIWant).map(x => x.time)
          )
        ).sort();
        setCurrentTimes(uniqueTimes);

        //console.log("uniqueTimes", uniqueTimes);

        setData(betterMatchData);
        toggleLoading(false);
      })
      .catch(x => console.log("error", x));
  }, []);

  return (
    <Table>
      <TableBody>
        {isLoading
          ? null
          : currentTimes.map(time => (
              <TableRow key={time}>
                <TableCell
                  style={{
                    borderBottom: "none",
                    paddingRight: 0,
                    textAlign: "center"
                  }}
                >
                  {time}
                </TableCell>
                {data
                  .filter(x => x.day === currentDay && x.time === time)
                  .map(match => (
                    <TableCell
                      key={match.id}
                      style={{ width: "50%", borderBottom: "none" }}
                    >
                      {/*match data includs
                      id, day, time, teamhome, teamaway, colors
                      */}
                      <SchedButton
                        data={match}
                        setPage={setPage}
                        handleGameChoice={handleGameChoice}
                      />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}

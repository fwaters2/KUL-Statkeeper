import React from "react";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import SchedButton from "./SchedButton";
import firebase2 from "../../Utils/Firebase2";
import moment from "moment";
import {
  MATCHES_COL,
  PLAYERS_COL,
  RESULTS_COL,
  ROSTERS_COL,
  TEAMS_COL,
} from "../../Assets/firestoreCollections";

export default function SchedTable(props) {
  const { setUniqueDates, currentDate, getClosestDate, setCurrentDate } = props;
  const [currentTimes, setCurrentTimes] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [isLoading, toggleLoading] = React.useState(true);

  function getFirebaseArray(name) {
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

  function getFirebaseObject(name) {
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

  React.useEffect(() => {
    const getMatches = getFirebaseArray(MATCHES_COL);

    const getResults = getFirebaseObject(RESULTS_COL);

    const getTeams = getFirebaseObject(TEAMS_COL);

    const getRosters = getFirebaseArray(ROSTERS_COL);

    let playerData = {};

    const getPlayerData = firebase2
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

    Promise.all([getMatches, getTeams, getRosters, getPlayerData, getResults])
      .then((values) => {
        let uniqueDates = Array.from(
          new Set(
            values[0]
              .sort((x, y) => {
                if (moment(x.datetime.toDate()).isBefore(y.datetime.toDate())) {
                  return -1;
                } else {
                  return 1;
                }
              })
              .map((x) => moment(x.datetime.toDate()).format("MMMM Do YYYY"))
          )
        );
        const closestDate = getClosestDate(uniqueDates);
        setCurrentDate(closestDate);
        setUniqueDates(uniqueDates);
        let dateIWant = closestDate.date;

        let betterMatchData = values[0]
          .filter(
            (x) =>
              moment(x.datetime.toDate()).format("MMMM Do YYYY") === dateIWant
          )
          .map((game) => {
            console.log("valu", values[1][game.team_home]);
            const data = {
              id: game.id,
              day: moment(game.datetime.toDate()).format("MMMM Do YYYY"),
              time: moment(game.datetime.toDate()).format("LT"),
              homeScore: values[4][game.id] ? values[4][game.id].homePts : "",
              awayScore: values[4][game.id] ? values[4][game.id].awayPts : "",
              homeTeamData: {
                id: game.team_home,
                name: values[1][game.team_home].name,
                colorPrimary: values[1][game.team_home].colorPrimary,
                colorSecondary: values[1][game.team_home].colorSecondary,
                roster: values[2]
                  .filter((x) => x.team_id === game.team_home)
                  .map((y) => values[3][y.player_id]),
              },

              awayTeamData: {
                id: game.team_away,
                name: values[1][game.team_away].name,
                colorPrimary: values[1][game.team_away].colorPrimary,
                colorSecondary: values[1][game.team_away].colorSecondary,
                roster: values[2]
                  .filter((x) => x.team_id === game.team_away)
                  .map((y) => values[3][y.player_id]),
              },
            };
            return data;
          });
        //setUniqueDates(Array.from(new Set(betterMatchData.map(x => x.day))))
        //let uniqueDates = Array.from(new Set(betterMatchData.map(x => x.day)));
        // let uniqueDates = Array.from(new Set(betterMatchData.map(x => x.day)));
        // setUniqueDates(uniqueDates);
        // let dateIWant = currentDate.date;
        // setCurrentDay(dateIWant);
        let uniqueTimes = Array.from(
          new Set(
            betterMatchData
              //.filter(y => y.day === dateIWant)
              .map((x) => x.time)
          )
        ).sort();
        setCurrentTimes(uniqueTimes);

        setData(betterMatchData);
        toggleLoading(false);
      })
      .catch((x) => console.log("error", x));
  }, []);

  return (
    <Table>
      <TableBody>
        {isLoading
          ? null
          : currentTimes.map((time) => (
              <TableRow key={time}>
                <TableCell
                  style={{
                    borderBottom: "none",
                    paddingRight: 0,
                    textAlign: "center",
                  }}
                >
                  {time}
                </TableCell>

                {data
                  .filter((x) => x.day === currentDate.date && x.time === time)
                  .map((match) => (
                    <TableCell
                      key={match.id}
                      style={{ width: "50%", borderBottom: "none" }}
                    >
                      <SchedButton data={match} />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}

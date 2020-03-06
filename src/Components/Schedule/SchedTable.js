import React from "react";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import SchedButton from "./SchedButton";
import firebase2 from "../../Utils/Firebase2";
import moment from "moment";

export default function SchedTable() {
  const [currentMatches, setCurrentMatches] = React.useState([]);
  const [currentTeams, setCurrentTeams] = React.useState([]);
  const [currentDay, setCurrentDay] = React.useState(null);
  const [currentTimes, setCurrentTimes] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [isLoading, toggleLoading] = React.useState(true);

  React.useEffect(() => {
    let matches = [];
    let teamData = {};
    const getMatches = firebase2
      .firestore()
      .collection("matches")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          matches = [...matches, doc.data()];
        });
        return matches;
      });
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
    Promise.all([getMatches, getTeams])
      .then(values => {
        let betterMatchData = values[0].map(game => ({
          day: moment(game.datetime.toDate()).format("MMMM Do YYYY"),
          time: moment(game.datetime.toDate()).format("LT"),
          teamHome: values[1][game.team_home].team,
          teamAway: values[1][game.team_away].team,
          homeColorPrimary: values[1][game.team_home].colorPrimary,
          homeColorSecondary: values[1][game.team_home].colorSecondary,
          awayColorPrimary: values[1][game.team_away].colorPrimary,
          awayColorSecondary: values[1][game.team_away].colorSecondary
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

        console.log("uniqueTimes", uniqueTimes);
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
              <TableRow>
                <TableCell>{time}</TableCell>
                {data
                  .filter(x => x.day === currentDay && x.time === time)
                  .map(match => (
                    <TableCell style={{ width: "50%" }}>
                      <SchedButton data={match} />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}

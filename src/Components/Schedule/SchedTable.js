import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableRow,
} from "@material-ui/core";
import SchedButton from "./SchedButton";
import { fetchData } from "./schedule_utils";
import { TableCellTime, TableCellMatchButton } from "./components/TableCells";
import firebase2 from "../../Utils/Firebase2";

export default function SchedTable(props) {
  const { currentDate } = props;
  const [currentTimes, setCurrentTimes] = useState([]);
  const [finishedGames, setFinishedGames] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, toggleLoading] = useState(true);

  const dataFetching = async (currentDate) => {
    const data = await fetchData(currentDate).then(
      ({ uniqueTimes, betterMatchData }) => {
        setCurrentTimes(uniqueTimes);
        setData(betterMatchData);
        toggleLoading(false);
        return null;
      }
    );
    return data;
  };

  useEffect(() => {
    toggleLoading(true);

    dataFetching(currentDate).then(() => toggleLoading(false));
  }, [currentDate]);

  function filterByTime(data, date, time) {
    return data.filter((x) => x.day === date && x.time === time);
  }

  useEffect(() => {
    firebase2
      .firestore()
      .collection("21SpringCompletedGames")
      .get()
      .then(({ docs }) => {
        let completedGames = [];
        docs.map((doc) => {
          let data = { id: doc.id, ...doc.data() };
          completedGames.push(data);
        });
        setFinishedGames(completedGames);
      });
  }, []);

  const finishedGameIds = () => {
    return finishedGames.map((game) => game.id);
  };

  if (isLoading) {
    return (
      <Box height={"100%"} m="auto">
        <CircularProgress size={100} />
      </Box>
    );
  }
  return (
    <Table>
      <TableBody>
        {isLoading ? (
          <Box m="auto">
            <CircularProgress />
          </Box>
        ) : (
          currentTimes.map((time, index) => {
            const filteredMatches = filterByTime(data, currentDate.date, time);
            return (
              <TableRow
                key={time}
                style={
                  index !== currentTimes.length - 1
                    ? {
                        borderBottom: "grey solid 1px",
                      }
                    : { borderBottom: "none" }
                }
              >
                <TableCellTime>{time}</TableCellTime>
                {filteredMatches.map((match) => (
                  <React.Fragment key={match.id}>
                    <TableCellMatchButton key={match.id}>
                      <SchedButton
                        data={match}
                        finishedGameIds={finishedGameIds}
                      />
                    </TableCellMatchButton>
                    {filteredMatches.length < 2 && <TableCellMatchButton />}
                  </React.Fragment>
                ))}
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}

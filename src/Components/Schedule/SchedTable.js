import React, { useContext } from "react";
import { Table, TableBody, TableRow } from "@material-ui/core";
import SchedButton from "./SchedButton";

import { TableCellTime, TableCellMatchButton } from "./components/TableCells";
import { ScheduleContext } from "../../Contexts/ScheduleContext";
import { getUniqueTimes, parseMatchData } from "../../Utils/schedule_utils";

export default function SchedTable() {
  const { finishedGames, currentDate, matches, teamData, results } = useContext(
    ScheduleContext
  );
  const currentTimes = getUniqueTimes(matches, currentDate);

  const data = parseMatchData(currentDate, matches, teamData, results);

  function filterByTime(data, date, time) {
    return data.filter((x) => x.day === date && x.time === time);
  }

  const finishedGameIds = () => {
    return finishedGames.map((game) => game.id);
  };

  return (
    <Table>
      <TableBody>
        {currentTimes.map((time, index) => {
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
              {filteredMatches.map((match) => {
                console.log("match", match);
                return (
                  <React.Fragment key={match.id}>
                    <TableCellMatchButton key={match.id}>
                      <SchedButton
                        data={match}
                        finishedGameIds={finishedGameIds}
                      />
                    </TableCellMatchButton>
                    {filteredMatches.length < 2 && <TableCellMatchButton />}
                  </React.Fragment>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

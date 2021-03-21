import React, { useState, useEffect } from "react";
import { Table, TableBody, TableRow } from "@material-ui/core";
import SchedButton from "./SchedButton";
import { fetchData } from "./schedule_utils";
import { TableCellTime, TableCellMatchButton } from "./components/TableCells";

export default function SchedTable(props) {
  const { setUniqueDates, currentDate, setCurrentDate } = props;
  const [currentTimes, setCurrentTimes] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, toggleLoading] = useState(true);

  useEffect(() => {
    fetchData().then(
      ({ closestDate, uniqueDates, uniqueTimes, betterMatchData }) => {
        setCurrentDate(closestDate);
        setUniqueDates(uniqueDates);
        setCurrentTimes(uniqueTimes);
        setData(betterMatchData);
        toggleLoading(false);
        return null;
      }
    );
  }, []);

  return (
    <Table>
      <TableBody>
        {!isLoading &&
          currentTimes.map((time) => (
            <TableRow key={time}>
              <TableCellTime>{time}</TableCellTime>
              {data
                .filter((x) => x.day === currentDate.date && x.time === time)
                .map((match) => (
                  <TableCellMatchButton key={match.id}>
                    <SchedButton data={match} />
                  </TableCellMatchButton>
                ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

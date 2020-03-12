import React from "react";
import { Paper, Box } from "@material-ui/core";
import Title from "./Title";
import ScheduleSubtitle from "./ScheduleSubtitle";
import SchedTable from "./SchedTable";
import moment from "moment";

export default function ScheduleContainer() {
  const [uniqueDates, setUniqueDates] = React.useState([]);
  const [currentDate, setCurrentDate] = React.useState({
    weekNum: 1,
    date: moment("3/28/2020").format("MMMM Do YYYY")
  });
  return (
    <div
      id="root"
      style={{
        minHeight: "100vh",
        background: "#283895",
        color: "white",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Title currentSeason={"Spring 2020"} />
      <Paper
        style={{ margin: "0 2em 6em 2em", flex: 1, borderRadius: "16px" }}
        elevation={10}
      >
        <ScheduleSubtitle
          currentDate={currentDate}
          uniqueDates={uniqueDates}
          setCurrentDate={setCurrentDate}
          currentSeason={"Spring 2020"}
          currentWeek={{
            week: `Week ${currentDate.weekNum}`,
            date: moment(currentDate.date).format("MMM Do")
          }}
        />
        <Box mt="1em">
          <SchedTable
            currentDate={currentDate}
            setUniqueDates={setUniqueDates}
          />
        </Box>
      </Paper>
    </div>
  );
}

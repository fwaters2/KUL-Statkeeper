import React from "react";
import { Paper, Box } from "@material-ui/core";
import Title from "./Title";
import ScheduleSubtitle from "./ScheduleSubtitle";
import SchedTable from "./SchedTable";

export default function ScheduleContainer(props) {
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
          currentSeason={"Spring 2020"}
          currentWeek={{ week: "Week 2", date: "April 11th" }}
        />
        <Box mt="1em">
          <SchedTable {...props} />
        </Box>
      </Paper>
    </div>
  );
}

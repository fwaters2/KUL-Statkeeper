import React from "react";
import { Paper, Box } from "@material-ui/core";
import Title from "./Title";
import ScheduleSubtitle from "./ScheduleSubtitle";
import SchedTable from "./SchedTable";

export default function ScheduleContainer() {
  return (
    <div
      id="root"
      style={{
        minHeight: "100vh",
        background: "#283895",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title />
      <Paper
        style={{
          margin: "0 2em 6em 2em",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          backgroundColor: "#ffffff95",
        }}
      >
        <ScheduleSubtitle />
        <Box
          mt="1em"
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <SchedTable />
        </Box>
      </Paper>
    </div>
  );
}

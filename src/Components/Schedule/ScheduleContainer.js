import React from "react";
import { Paper, Box } from "@material-ui/core";
import ScheduleSubtitle from "./ScheduleSubtitle";
import SchedTable from "./SchedTable";
import KUL_final from "./KUL_final.svg";

export default function ScheduleContainer() {
  return (
    <div
      id="root"
      style={{
        background: `#283895`,
        minHeight: "100vh",
        color: "white",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "fixed",
          height: "100vh",
          width: "100vw",
          zIndex: 0,
          background: `url(${KUL_final}) no-repeat center/40%`,
        }}
      />
      <Paper
        style={{
          margin: "2em",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          backgroundColor: "#ffffff95",
          zIndex: 1,
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

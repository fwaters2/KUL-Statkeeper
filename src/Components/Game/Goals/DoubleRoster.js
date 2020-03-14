import React from "react";
import { Grid, Box } from "@material-ui/core";
import RosterList from "../RosterList";

export default function DoubleRoster(props) {
  const {
    setAssist,
    setGoal,
    assist,
    goal,
    roster,
    setPlayerGoalId,
    setPlayerAssistId
  } = props;
  const handleAssist = player => () => {
    setAssist(player.player);
    setPlayerAssistId(player.id);
  };
  const handleGoal = player => () => {
    setGoal(player.player);
    setPlayerGoalId(player.id);
  };
  const handleCallahan = () => {
    setAssist("Callahan");
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Box style={{ borderRight: "1px solid black" }}>
          <RosterList
            title="Assist"
            handleStat={handleAssist}
            roster={roster}
            stat={assist}
            handleCallahan={handleCallahan}
          />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          style={{
            borderLeft: "1px solid black",

            height: "100%"
          }}
        >
          <RosterList
            title="Goal"
            handleStat={handleGoal}
            roster={roster}
            stat={goal}
            handleCallahan={handleCallahan}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

import React from "react";
import { AppBar, Toolbar, Grid, Typography } from "@material-ui/core";

export default function ScheduleSubtitle(props) {
  const { currentSeason, currentWeek } = props;
  return (
    <AppBar
      position="static"
      color="default"
      style={{ borderRadius: "16px 16px 0 0" }}
    >
      <Toolbar>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography>Spring</Typography>
            <Typography variant="caption">2020</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" align="center">
              Schedule
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="right">{currentWeek.week}</Typography>
            <Typography variant="caption" alight="right">
              {currentWeek.date}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

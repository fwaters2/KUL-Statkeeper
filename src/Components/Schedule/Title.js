import React from "react";
import { Typography, Box, Grid } from "@material-ui/core";
import KUL_final from "./KUL_final.svg";
export default function Title() {
  return (
    <Box style={{ margin: "3em 0" }}>
      <Grid container alignItems="center" justify="space-around">
        <Grid item>
          <img src={KUL_final} alt="logo" height="100px" />
        </Grid>
        <Grid item>
          <Typography align="center" variant="h2">
            Statkeeper
          </Typography>
        </Grid>
        <Grid item>
          <img src={KUL_final} alt="logo" height="100px" />
        </Grid>
      </Grid>
    </Box>
  );
}

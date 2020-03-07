import React from "react";
import { Typography, Box, Grid } from "@material-ui/core";
import KUL_final from "./KUL_final.svg";
export default function Title() {
  const Logo = () => {
    return (
      <Grid item>
        <Box
          style={{
            padding: "2em",
            background:
              "radial-gradient(rgba(255,255,255,0.4), transparent 70%)",
            borderRadius: "2em"
          }}
        >
          <img src={KUL_final} alt="logo" height="100px" />
        </Box>
      </Grid>
    );
  };
  return (
    <Box style={{ margin: "3em 0" }}>
      <Grid container alignItems="center" justify="space-around">
        <Logo />
        <Grid item>
          <Typography align="center" variant="h2">
            Statkeeper
          </Typography>
        </Grid>
        <Logo />
      </Grid>
    </Box>
  );
}

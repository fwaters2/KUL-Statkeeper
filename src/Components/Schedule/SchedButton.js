import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";

export default function SchedButton(props) {
  const { data } = props;
  return (
    <Button
      fullWidth
      //onClick={handleClick(game)}
      variant="contained"
      color="primary"
      style={{
        textTransform: "none",
        padding: "1em",
        borderRadius: "16px",
        border: "7px outset lightgrey",
        boxShadow: "0 0 5px 3px black",
        background: `linear-gradient(155deg, ${data.homeColorPrimary}4F  50%, ${data.awayColorPrimary}4F 50%)`
      }}
    >
      <Grid container direction="column">
        <Grid item>
          <Typography
            align="left"
            style={{
              color: "black",
              fontWeight: "bolder"
            }}
          >
            {data.teamHome}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            align="right"
            style={{ color: "black", fontWeight: "bolder" }}
          >
            {data.teamAway}
          </Typography>
        </Grid>
      </Grid>
    </Button>
  );
}

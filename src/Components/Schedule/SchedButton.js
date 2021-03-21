import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import GameContext from "../../Assets/GameContext";

export default function SchedButton({ data }) {
  const { setMatchData, setPage } = React.useContext(GameContext);
  const { homeTeamData, homeScore, awayTeamData, awayScore } = data;

  const handleClick = () => {
    setMatchData(data);
    setPage("Game");
  };
  const textStyle = {
    color: "black",
    fontWeight: "bolder",
  };

  return (
    <Button
      fullWidth
      onClick={handleClick}
      variant="contained"
      color="primary"
      style={{
        minHeight: "90px",
        textTransform: "none",
        padding: "1em",
        borderRadius: "16px",
        border: "2px lightgrey",
        boxShadow: "0 0 5px 3px black",
        background: `linear-gradient(155deg, ${
          homeTeamData.colorPrimary || "#FFFFFF"
        }99  50%, ${awayTeamData.colorPrimary || "#FFFFFF"}99 50%)`,
      }}
    >
      <Grid container style={{ height: "-webkit-fill-available" }}>
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justify="flex-start"
          >
            <Grid item>
              <Typography align="left" style={textStyle}>
                {homeTeamData.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" align="left" style={textStyle}>
                {homeScore}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ alignSelf: "flex-end" }}>
          <Grid container direction="column" alignItems="flex-end">
            <Grid item>
              <Typography variant="h4" align="right" style={textStyle}>
                {awayScore}
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="right" style={textStyle}>
                {awayTeamData.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Button>
  );
}

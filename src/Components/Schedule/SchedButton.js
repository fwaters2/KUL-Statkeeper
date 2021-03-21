import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import GameContext from "../../Assets/GameContext";

export default function SchedButton(props) {
  const { setMatchData, setPage } = React.useContext(GameContext);
  const { data } = props;

  const handleClick = () => {
    setMatchData(data);
    setPage("Game");
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
          data.homeTeamData.colorPrimary || "#FFFFFF"
        }99  50%, ${data.awayTeamData.colorPrimary || "#FFFFFF"}99 50%)`,
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
              <Typography
                align="left"
                style={{
                  color: "black",
                  fontWeight: "bolder",
                }}
              >
                {data.homeTeamData.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h4"
                align="left"
                style={{
                  color: "black",
                  fontWeight: "bolder",
                }}
              >
                {data.homeScore}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ alignSelf: "flex-end" }}>
          <Grid container direction="column" alignItems="flex-end">
            <Grid item>
              <Typography
                variant="h4"
                align="right"
                style={{ color: "black", fontWeight: "bolder" }}
              >
                {data.awayScore}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                align="right"
                style={{ color: "black", fontWeight: "bolder" }}
              >
                {data.awayTeamData.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Button>
  );
}

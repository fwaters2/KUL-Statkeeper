import React from "react";
import { Grid, Button } from "@material-ui/core";
//import "./PlayoffsSched.json";
//const playoffs = require("./PlayoffsSched.json");

export default function Playoffs(props) {
  const { scheduleData, setPage, handleGameChoice } = props;

  const exampleWeek1Sched = scheduleData
    //.filter(game => game.Date === dateToFilter)
    .sort((a, b) => a.GameNO - b.GameNO);
  const handleClick = game => () => {
    handleGameChoice(
      game.HomeTeam,
      game.AwayTeam,
      game.GameNO,
      game.title,
      game.id
    );
    setPage("Game");
  };

  return (
    <Grid container>
      <Grid container item xs={6}>
        {exampleWeek1Sched
          .filter(game => game.Field === 1)
          .filter(game => game.title !== "KUL Championship")
          .map(game => (
            <Grid key={game.GameNO} item xs={12} style={{ margin: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleClick(game)}
                style={{
                  padding: "20px 0"
                }}
              >
                {game.title}
              </Button>
            </Grid>
          ))}
      </Grid>
      <Grid container item xs={6}>
        {exampleWeek1Sched
          .filter(game => game.Field === 2)
          .map(game => (
            <Grid
              item
              key={game.GameNO}
              xs={12}
              style={{
                margin: "10px"
              }}
            >
              <Button
                fullWidth
                onClick={handleClick(game)}
                variant="contained"
                color="primary"
                style={{ padding: "20px 0" }}
              >
                {game.title}
              </Button>
            </Grid>
          ))}
      </Grid>
      <Grid container item xs={12}>
        {exampleWeek1Sched
          .filter(game => game.title === "KUL Championship")
          .map(game => (
            <Grid item key={game.title} xs={12} style={{ margin: "10px" }}>
              <Button
                fullWidth
                onClick={handleClick(game)}
                variant="contained"
                color="primary"
                style={{ padding: "20px 0" }}
              >
                {game.title}
              </Button>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

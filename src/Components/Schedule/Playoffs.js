import React from "react";
import { Grid, Button, Typography, Fab, Box, Paper } from "@material-ui/core";
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
  const handleGoalOpen = () => {
    setPage("TableView");
  };
  const handleDOpen = () => {
    setPage("DTableView");
  };
  return (
    <div
      id="root"
      style={{
        height: "100vh",
        background: "#283895",
        color: "white",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box style={{ marginTop: "100px", marginBottom: "50px" }}>
        <Typography align="center" variant="h2">
          Playoffs
        </Typography>
        <Typography align="center" variant="h6">
          Choose game to Scorekeep:
        </Typography>
      </Box>
      <Paper style={{ margin: "20px" }} elevation={10}>
        <Typography
          variant="h4"
          align="center"
          style={{ borderBottom: "3px solid #283895", margin: "10px" }}
        >
          Schedule
        </Typography>
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
                <Grid item key={game.GameNo} xs={12} style={{ margin: "10px" }}>
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
      </Paper>
      <Fab
        variant="extended"
        style={{
          margin: 0,
          top: "auto",
          maxWidth: "500px",
          bottom: 20,
          right: 20,
          position: "fixed"
        }}
        onClick={handleDOpen}
      >
        <Typography>D Data</Typography>
      </Fab>
      <Fab
        variant="extended"
        style={{
          margin: 0,
          top: "auto",
          maxWidth: "500px",
          bottom: 80,
          right: 20,
          position: "fixed"
        }}
        onClick={handleGoalOpen}
      >
        <Typography>Goal Data</Typography>
      </Fab>
    </div>
  );
}

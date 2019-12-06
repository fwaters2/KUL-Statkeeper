import React from "react";
import "./Schedule.json";
import { Grid, Button, Typography, Fab, Box, Paper } from "@material-ui/core";
//import "./vs.svg";
//import "../../Teams.json";

//const teamColors = require("../../Teams.json");

//const vsLogo = require("./vs.svg");

export default function Games(props) {
  const {
    scheduleData,
    setPage,
    //gameData,
    //setGameData,
    handleGameChoice
  } = props;
  const dateToFilter = "11/23/2019";
  const exampleWeek1Sched = scheduleData
    .filter(game => game.Date === dateToFilter)
    .sort((a, b) => a.GameNO - b.GameNO);
  const handleClick = game => () => {
    handleGameChoice(game.HomeTeam, game.AwayTeam, game.GameNO);
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
        <Typography align="center" variant="h4">
          {dateToFilter}
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
          {/* <Grid item xs={6}>
          Field 1
          <List dense>
            {exampleWeek1Sched
              .filter(game => game.Field === 1)
              .map(game => (
                <Paper>
                  <ListItem button>
                    <Grid container>
                      <Grid item xs={9}>
                        <List dense>
                          <ListItem
                            style={{
                              background: "repeating-linear-gradient(45deg, " + teamColors.find(
                                team => team.team === game.HomeTeam
                              ).bkgdColor + "," + teamColors.find(
                                team => team.team === game.HomeTeam
                              ).bkgdColor + " 10px, #FFFFFF 10px, #FFFFFF 20px)"
                         
                            }}
                          >
                            <Typography variant = 'h6'>{game.HomeTeam}</Typography>
                          </ListItem>
                          <ListItem
                            style={{
                              background: "repeating-linear-gradient(45deg, " + teamColors.find(
                                team => team.team === game.AwayTeam
                              ).bkgdColor + "," + teamColors.find(
                                team => team.team === game.AwayTeam
                              ).bkgdColor + " 10px, #FFFFFF 10px, #FFFFFF 20px)"
                            }}
                          >
                            <Typography variant = 'h6'>{game.AwayTeam}</Typography>
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={3}
                        alignContent="center"
                        justifyContent="center"
                      >
                        <img src={vsLogo} height="70px" />
                      </Grid>
                    </Grid>
                  </ListItem>
                </Paper>
              ))}
          </List>
        </Grid>
        <Grid item xs={6}>
          Field 2
          <List>
            {exampleWeek1Sched
              .filter(game => game.Field === 2)
              .map(game => (
                <ListItem button onClick={handleClick(game)}>
                  <ListItemText
                    primary={game.HomeTeam + " vs " + game.AwayTeam}
                  />
                </ListItem>
              ))}
          </List>
        </Grid> */}
          <Grid container item xs={6}>
            {exampleWeek1Sched
              .filter(game => game.Field === 1)
              .map(game => (
                <Grid key={game.GameNO} item xs={12} style={{ margin: "10px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleClick(game)}
                    style={{
                      padding: "20px 0"
                      //margin: "10px"
                    }}
                  >
                    {game.HomeTeam} vs {game.AwayTeam}
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
                    {game.HomeTeam} vs {game.AwayTeam}
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

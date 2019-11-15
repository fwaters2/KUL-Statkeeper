import React from "react";
import {
  List,
  ListItemText,
  ListItem,
  Grid,
  Typography
} from "@material-ui/core";

export default function DoubleRoster(props) {
  const {
    setAssist,
    setAssistID,
    setGoal,
    setGoalID,
    assist,
    //assistID,
    goal,
    //goalID,
    roster,
    setTeamID
  } = props;
  const handleAssist = player => () => {
    setAssist(player.Name);
    setAssistID(player.PlayerID);
  };
  const handleGoal = player => () => {
    setGoal(player.Name);
    setGoalID(player.PlayerID);
    setTeamID(player.TeamID);
  };
  const handleCallahan = () => {
    setAssist("Callahan");
    setAssistID(0);
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography
          variant="h6"
          align="center"
          style={{ background: "#283895", color: "white", margin: "0 5px" }}
        >
          Assist
        </Typography>
        <List>
          {roster.map(player => (
            <ListItem
              key={player.Name}
              button
              selected={player.Name === assist}
              variant="contained"
              onClick={handleAssist(player)}
            >
              <ListItemText
                primary={player.Name}
                secondary={"#" + player.JerseyNO + " " + player.JerseyName}
              />
            </ListItem>
          ))}
          <ListItem
            button
            selected={assist === "Callahan"}
            onClick={handleCallahan}
          >
            <ListItemText
              primary="CALLAHAN"
              secondary="Interception in endzone"
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant="h6"
          align="center"
          style={{ background: "#283895", color: "white", margin: "0 5px" }}
        >
          Goal
        </Typography>
        <List>
          {roster.map(player => (
            <ListItem
              key={player.Name}
              button
              selected={player.Name === goal}
              onClick={handleGoal(player)}
            >
              <ListItemText
                primary={player.Name}
                secondary={"#" + player.JerseyNO + " " + player.JerseyName}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

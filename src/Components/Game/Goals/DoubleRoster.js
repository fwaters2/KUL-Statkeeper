import React from "react";
import {
  List,
  ListItemText,
  ListItem,
  Grid,
  Typography,
  ListItemAvatar,
  Avatar,
  Box
} from "@material-ui/core";

export default function DoubleRoster(props) {
  const {
    setAssist,
    setGoal,
    assist,
    goal,
    roster,
    setPlayerGoalId,
    setPlayerAssistId
  } = props;
  const handleAssist = player => () => {
    setAssist(player.player);
    setPlayerAssistId(player.id);
  };
  const handleGoal = player => () => {
    setGoal(player.player);
    setPlayerGoalId(player.id);
  };
  const handleCallahan = () => {
    setAssist("Callahan");
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Box style={{ borderRight: "1px solid black" }}>
          <Typography
            variant="h6"
            align="center"
            style={{ background: "#283895", color: "white", margin: "0 5px" }}
          >
            Assist
          </Typography>
          <List>
            {roster.map(x => (
              <ListItem
                key={x.player}
                button
                selected={x.player === assist}
                variant="contained"
                onClick={handleAssist(x)}
              >
                <ListItemAvatar>
                  <Avatar alt={x.player} src={x.photo} />
                </ListItemAvatar>
                <ListItemText
                  primary={x.player}
                  //secondary={"#" + player.JerseyNO + " " + player.JerseyName}
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
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          style={{
            borderLeft: "1px solid black",

            height: "100%"
          }}
        >
          <Typography
            variant="h6"
            align="center"
            style={{ background: "#283895", color: "white", margin: "0 5px" }}
          >
            Goal
          </Typography>
          <List>
            {roster.map(x => (
              <ListItem
                key={x.player}
                button
                selected={x.player === goal}
                onClick={handleGoal(x)}
              >
                <ListItemAvatar>
                  <Avatar alt={x.player} src={x.photo} />
                </ListItemAvatar>
                <ListItemText
                  primary={x.player}
                  //secondary={"#" + player.JerseyNO + " " + player.JerseyName}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    </Grid>
  );
}

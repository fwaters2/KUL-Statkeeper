import React from "react";
import { List, ListItemText, ListItem, Grid } from "@material-ui/core";

export default function DoubleRoster(props) {
  const { setAssist, setGoal, assist, goal, roster } = props;
  return (
    <Grid container>
      <Grid item xs={6}>
        <List>
          {roster.map(player => (
            <ListItem
              button
              selected={player.Name === assist}
              variant="contained"
              onClick={() => setAssist(player.Name)}
            >
              <ListItemText primary={player.Name} secondary={"#" + player.JerseyNO +" " +player.JerseyName} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={6}>
        <List>
          {roster.map(player => (
            <ListItem
              button
              selected={player.Name === goal}
              onClick={() => setGoal(player.Name)}
            >
              <ListItemText primary={player.Name} secondary={"#" + player.JerseyNO +" " +player.JerseyName} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

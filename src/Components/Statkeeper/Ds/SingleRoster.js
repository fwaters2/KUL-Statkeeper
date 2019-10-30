import React from "react";
import { List, ListItemText, ListItem } from "@material-ui/core";

export default function SingleRoster(props) {
  const { d, setD, roster } = props;

  return (
    <List>
      {roster.map(player => (
        <ListItem
          button
          selected={player.Name === d}
          onClick={() => setD(player.Name)}
        >
          <ListItemText
            primary={player.Name}
            secondary={"#" + player.JerseyNO + " " + player.JerseyName}
          />
        </ListItem>
      ))}
    </List>
  );
}

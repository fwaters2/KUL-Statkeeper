import React from "react";
import { List, ListItemText, ListItem } from "@material-ui/core";

export default function SingleRoster(props) {
  const { d, setD, roster, setPlayerID, setTeamID } = props;
  const handleD = player=>()=>{
    setD(player.Name)
    setPlayerID(player.PlayerID)
    setTeamID(player.TeamID)
  }
  return (
    <List>
      {roster.map(player => (
        <ListItem
          button
          selected={player.Name === d}
          onClick={handleD(player)}
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

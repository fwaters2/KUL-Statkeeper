import React from "react";
import {
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";

export default function SingleRoster(props) {
  const { d, setD, roster, setPlayerId } = props;
  const handleD = player => () => {
    setD(player.player);
    setPlayerId(player.id);
  };
  return (
    <List>
      {console.log("roster", roster)}
      {roster.map(player => (
        <ListItem
          key={player.player}
          button
          selected={player.player === d}
          onClick={handleD(player)}
        >
          <ListItemAvatar>
            <Avatar alt={player.player} src={player.photo} />
          </ListItemAvatar>
          <ListItemText
            primary={player.player}
            //secondary={"#" + player.JerseyNO + " " + player.JerseyName}
          />
        </ListItem>
      ))}
    </List>
  );
}

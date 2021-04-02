import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";

export default function RosterList(props) {
  const { title, handleStat, roster, stat, handleCallahan } = props;

  const byJerseyNum = (a, b) => {
    return a.jerseyNum - b.jerseyNum;
  };

  return (
    <>
      <Typography
        variant="h6"
        align="center"
        style={{ background: "#283895", color: "white", margin: "0 5px" }}
      >
        {title}
      </Typography>
      <List>
        {roster.sort(byJerseyNum).map((x) => {
          return (
            <ListItem
              key={x.player}
              button
              selected={x.player === stat}
              variant="contained"
              onClick={handleStat(x)}
            >
              <ListItemAvatar>
                <Avatar alt={x.player} src={x.photo} />
              </ListItemAvatar>
              <ListItemText
                primary={x.player}
                secondary={`${
                  x.jerseyNum !== undefined ? "#" + x.jerseyNum : ""
                } ${x.jerseyBack}`}
              />
            </ListItem>
          );
        })}
        {title === "Assist" ? (
          <ListItem
            button
            selected={stat === "Callahan"}
            onClick={handleCallahan}
          >
            <ListItemText
              primary="CALLAHAN"
              secondary="Interception in endzone"
            />
          </ListItem>
        ) : null}
      </List>
    </>
  );
}

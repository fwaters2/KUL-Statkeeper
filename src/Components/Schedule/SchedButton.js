import React, { useState, useContext, useEffect } from "react";
import {
  Avatar,
  Card,
  CardActionArea,
  Grid,
  Typography,
} from "@material-ui/core";
import GameContext from "../../Assets/GameContext";
import firebase2 from "../../Utils/Firebase2";

export default function SchedButton({ data, finishedGameIds }) {
  const { setMatchData, setPage } = useContext(GameContext);
  const { id, homeTeamData, homeScore = 0, awayTeamData, awayScore = 0 } = data;
  const [homeRecord, setHomeRecord] = useState("0 - 0");
  const [awayRecord, setAwayRecord] = useState("0 - 0");

  useEffect(() => {
    firebase2
      .firestore()
      .collection("21SpringStandings")
      .doc(homeTeamData.name)
      .get()
      .then((doc) => {
        const { wins, losses } = doc.data();
        setHomeRecord(`${wins} - ${losses}`);
      });
  }, []);
  useEffect(() => {
    firebase2
      .firestore()
      .collection("21SpringStandings")
      .doc(awayTeamData.name)
      .get()
      .then((doc) => {
        const { wins, losses } = doc.data();
        setAwayRecord(`${wins} - ${losses}`);
      });
  }, []);

  const handleClick = () => {
    setMatchData(data);
    setPage("Game");
  };
  const textStyle = {
    color: "black",
    fontWeight: "bolder",
  };
  const arrow = {
    border: "solid black",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: "3px",
  };
  const leftArrow = {
    ...arrow,

    transform: "rotate(135deg)",
  };

  const rightArrow = {
    ...arrow,

    transform: "rotate(-45deg)",
  };
  function pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor) {
    var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    const textColor =
      r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
    return textColor;
  }
  function makeAbbreviation(stringToChange) {
    return stringToChange.match(/\b([A-Z])/g).join("");
  }

  const TeamRow = ({ name, score, color, isWinning, reverse, record }) => {
    return (
      <Grid
        item
        xs
        container
        alignItems="center"
        direction={reverse ? "row-reverse" : "row"}
        style={{
          minHeight: "80px",
          padding: "0 10px",
        }}
      >
        <Grid item xs container justify={reverse ? "flex-end" : "flex-start"}>
          <Grid container direction="column" alignItems="center">
            <Grid item xs>
              <Avatar
                align="left"
                style={{
                  backgroundColor: color,
                  color: pickTextColorBasedOnBgColorSimple(
                    color,
                    "white",
                    "black"
                  ),
                  fontSize: "14px",
                  fontWeight: "bolder",
                }}
              >
                {makeAbbreviation(name)}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography
                variant="caption"
                style={{ margin: "0 5px" }}
                align="center"
              >
                {record}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {isWinning ? (
          <Grid item xs container justify={reverse ? "flex-start" : "flex-end"}>
            <div style={reverse ? leftArrow : rightArrow} />
          </Grid>
        ) : (
          <Grid item xs />
        )}

        <Grid item>
          <Typography
            variant="h5"
            style={{
              margin: "0 5px",
              //color: "black",
              fontWeight: "bolder",
            }}
          >
            {score}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Card
      onClick={handleClick}
      raised
      style={{
        borderRadius: "18px",
      }}
    >
      <CardActionArea>
        <Grid container alignItems="center">
          <Grid item xs>
            <TeamRow
              isWinning={homeScore > awayScore}
              score={homeScore || 0}
              name={homeTeamData.name}
              color={homeTeamData.colorPrimary}
              record={homeRecord}
            />
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {finishedGameIds().includes(id) ? "Finished" : "VS"}
            </Typography>
          </Grid>
          <Grid item xs>
            <TeamRow
              reverse
              isWinning={awayScore > homeScore}
              score={awayScore || 0}
              name={awayTeamData.name}
              color={awayTeamData.colorPrimary}
              record={awayRecord}
            />
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

import React from "react";
import { Typography } from "@material-ui/core";

export default function Title(props) {
  const { title, homeTeam, awayTeam } = props;
  return (
    <>
      <Typography align="center" variant="h5">
        {title}
      </Typography>
      <Typography align="center" variant="h4">
        {homeTeam}
      </Typography>
      <Typography align="center" variant="h6">
        vs
      </Typography>
      <Typography align="center" variant="h4">
        {awayTeam}
      </Typography>
    </>
  );
}

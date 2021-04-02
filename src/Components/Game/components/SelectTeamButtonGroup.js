import { Button, ButtonGroup } from "@material-ui/core";
import React from "react";

const ButtonChoice = ({ onClick, team, color }) => {
  return (
    <Button
      style={{
        padding: "2em 0",
        backgroundColor: color + "66",
        minWidth: "200px",
      }}
      onClick={onClick}
    >
      {team}
    </Button>
  );
};

const SelectTeamButtonGroup = ({
  handleHomeClick,
  handleAwayClick,
  homeTeam,
  awayTeam,
  homeColor,
  awayColor,
}) => {
  return (
    <ButtonGroup fullWidth>
      <ButtonChoice
        onClick={handleHomeClick}
        team={homeTeam}
        color={homeColor}
      />
      <ButtonChoice
        onClick={handleAwayClick}
        team={awayTeam}
        color={awayColor}
      />
    </ButtonGroup>
  );
};

export default SelectTeamButtonGroup;

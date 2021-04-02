import { TableCell } from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../../../Contexts/AppContext";
import { populatePlayerData } from "../../../Utils/match_utils";

const PlayerCell = ({ id }) => {
  const { playerData } = useContext(AppContext);
  const { jerseyNum, player } = populatePlayerData(playerData, id);
  return <TableCell>{`#${jerseyNum} ${player}`}</TableCell>;
};

export default PlayerCell;

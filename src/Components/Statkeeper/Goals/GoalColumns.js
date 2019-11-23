import React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  IconButton
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Firestore from "../../../Utils/Firebase";
import GoalUpdate from "./GoalUpdate";
import { Edit } from "@material-ui/icons";
export default function GoalColumns(props) {
  const {
    stats,
    //teamColors,
    gameData
  } = props;
  const [updateDialog, toggleUpdateDialog] = React.useState(false);
  const [updateID, setUpdateID] = React.useState("");
  const [currentGoal, setCurrentGoal] = React.useState(0);
  const handleDelete = id => () => {
    Firestore.firestore()
      .collection("Goals")
      .doc(id)
      .delete();
  };
  const toggleGoalDialog = (id, GoalNO) => () => {
    setCurrentGoal(GoalNO);
    setUpdateID(id);
    toggleUpdateDialog(!updateDialog);
  };
  const closeUpdateDialog = () => {
    toggleUpdateDialog(false);
  };
  // const homeTeamColors = teamColors.find(
  //   team => team.team === gameData.homeTeam
  // ).bkgdColor;
  // const awayTeamColors = teamColors.find(
  //   team => team.team === gameData.awayTeam
  // ).bkgdColor;

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Assist</TableCell>
            <TableCell>Goal</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stat, index) => (
            <TableRow
              key={stat.GoalNo}
              // style={
              //   stat.team === gameData.homeTeam
              //     ? { backgroundColor: homeTeamColors }
              //     : { backgroundColor: awayTeamColors }
              // }
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{stat.TeamID}</TableCell>
              <TableCell>
                {"#"}
                {
                  (
                    gameData.awayRoster.find(
                      x => x.PlayerID === stat.AssistID
                    ) ||
                    gameData.homeRoster.find(x => x.PlayerID === stat.AssistID)
                  ).JerseyNO
                }{" "}
                {stat.Assist}
              </TableCell>
              <TableCell>
                {" "}
                {"#"}
                {
                  (
                    gameData.awayRoster.find(x => x.PlayerID === stat.GoalID) ||
                    gameData.homeRoster.find(x => x.PlayerID === stat.GoalID)
                  ).JerseyNO
                }{" "}
                {stat.Goal}
              </TableCell>
              {index + 1 === stats.length ? (
                <TableCell padding="none">
                  <IconButton color="secondary" onClick={handleDelete(stat.id)}>
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              ) : (
                <TableCell padding="none">
                  <IconButton
                    color="primary"
                    onClick={toggleGoalDialog(stat.id, index + 1)}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <GoalUpdate
        id={updateID}
        currentGoal={currentGoal}
        gameData={gameData}
        open={updateDialog}
        onClose={closeUpdateDialog}
        rosterHome={gameData.homeRoster}
        rosterAway={gameData.awayRoster}
        homeTeam={gameData.homeTeam}
        awayTeam={gameData.awayTeam}
      />
    </div>
  );
}

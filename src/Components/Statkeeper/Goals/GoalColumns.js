import React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Button
} from "@material-ui/core";
import Firestore from "../../../Utils/Firebase";
import GoalUpdate from "./GoalUpdate";
export default function GoalColumns(props) {
  const { stats, teamColors, gameData } = props;
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
  const homeTeamColors = teamColors.find(
    team => team.team === gameData.homeTeam
  ).bkgdColor;
  const awayTeamColors = teamColors.find(
    team => team.team === gameData.awayTeam
  ).bkgdColor;

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Assist</TableCell>
            <TableCell>Goal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stat, index) => (
            <TableRow

            // style={
            //   stat.team === gameData.homeTeam
            //     ? { backgroundColor: homeTeamColors }
            //     : { backgroundColor: awayTeamColors }
            // }
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{stat.TeamID}</TableCell>
              <TableCell>{stat.Assist}</TableCell>
              <TableCell>{stat.Goal}</TableCell>
              {index + 1 === stats.length ? (
                <TableCell>
                  <Button color="secondary" onClick={handleDelete(stat.id)}>
                    Delete
                  </Button>
                </TableCell>
              ) : (
                <TableCell>
                  <Button
                    color="primary"
                    onClick={toggleGoalDialog(stat.id, index + 1)}
                  >
                    Update
                  </Button>
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

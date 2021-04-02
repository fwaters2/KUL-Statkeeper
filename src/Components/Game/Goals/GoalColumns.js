import React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  IconButton,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { Edit } from "@material-ui/icons";
import PlayerCell from "../components/PlayerCell";

export default function GoalColumns(props) {
  const { points, choosePointIdToUpdate, handlePointDelete } = props;
  const handleUpdate = (goal) => () => {
    choosePointIdToUpdate(goal);
  };
  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Assist</TableCell>
          <TableCell>Goal</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {points.map((goal, index) => {
          return (
            <TableRow
              key={index}
              style={{ backgroundColor: goal.teamColor + "66" }}
            >
              <TableCell>{index + 1}</TableCell>
              <PlayerCell id={goal.playerAssistId} />
              <PlayerCell id={goal.playerGoalId} />
              {index + 1 === points.length ? (
                <TableCell padding="none">
                  <IconButton
                    color="secondary"
                    onClick={handlePointDelete(goal.id, goal.assistDBref)}
                  >
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              ) : (
                <TableCell padding="none">
                  <IconButton color="primary" onClick={handleUpdate(goal)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

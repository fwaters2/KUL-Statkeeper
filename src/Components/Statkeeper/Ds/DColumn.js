import React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  IconButton
} from "@material-ui/core";
import DUpdate from "./DUpdate";
import Firestore from "../../../Utils/Firebase";
import ClearIcon from "@material-ui/icons/Clear";
import { Edit } from "@material-ui/icons";

export default function DColumn(props) {
  const {
    stats,
    // teamColors,
    gameData
  } = props;
  const [updateDialog, toggleUpdateDialog] = React.useState(false);
  const [updateID, setUpdateID] = React.useState("");
  const [currentD, setCurrentD] = React.useState(0);

  const handleDelete = id => () => {
    Firestore.firestore()
      .collection("DDisplay")
      .doc(id)
      .delete();
    Firestore.firestore()
      .collection("Ds")
      .doc(id)
      .delete();
  };

  // const homeTeamColors = teamColors.find(
  //   team => team.team === gameData.homeTeam
  // ).bkgdColor;
  // const awayTeamColors = teamColors.find(
  //   team => team.team === gameData.awayTeam
  // ).bkgdColor;

  const toggleDDialog = (id, DNO) => () => {
    setCurrentD(DNO);
    setUpdateID(id);
    toggleUpdateDialog(!updateDialog);
  };
  const closeUpdateDialog = () => {
    toggleUpdateDialog(false);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>D</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stat, index) => (
            <TableRow
              key={stat.D}
              hover
              // style={
              //   stat.team === gameData.homeTeam
              //     ? { backgroundColor: homeTeamColors }
              //     : { backgroundColor: awayTeamColors }
              //}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{stat.D}</TableCell>
              {index + 1 === stats.length ? (
                <TableCell padding="none">
                  {/* <Button color="secondary" onClick={handleDelete(stat.id)}>
                    Delete
                  </Button> */}
                  <IconButton color="secondary" onClick={handleDelete(stat.id)}>
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              ) : (
                <TableCell padding="none">
                  {/* <Button
                    color="primary"
                    onClick={toggleDDialog(stat.id, index + 1)}
                  >
                    Update
                  </Button> */}
                  <IconButton
                    color="primary"
                    onClick={toggleDDialog(stat.id, index + 1)}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
          <TableRow rowSpan={2}>
            <TableCell colSpan={3}>
              <Typography variant="body2">
                KUL "D" definition: When a defender touches the disc before a
                turnover
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <DUpdate
        id={updateID}
        currentD={currentD}
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

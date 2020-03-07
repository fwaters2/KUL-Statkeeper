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
  const { stats, gameData } = props;
  const [updateDialog, toggleUpdateDialog] = React.useState(false);
  const [updateID, setUpdateID] = React.useState("");
  const [currentD, setCurrentD] = React.useState(0);

  const handleDelete = id => () => {
    Firestore.firestore()
      .collection("PlayoffDs")
      .doc(id)
      .delete();
  };

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
            <TableRow key={stat.D} hover>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {" "}
                {"#"}
                {"Steve"}
                {/* {
                  (
                    gameData.awayRoster.find(x => x.Name === stat.D) ||
                    gameData.homeRoster.find(x => x.Name === stat.D)
                  ).JerseyNO
                }{" "} */}
                {stat.D}
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
              <Typography variant="body2" align="center">
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

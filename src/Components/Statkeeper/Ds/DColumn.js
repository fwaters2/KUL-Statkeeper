import React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Button
} from "@material-ui/core";
import DUpdate from "./DUpdate";
import Firestore from '../../../Utils/Firebase'



export default function DColumn(props) {
  const { stats, teamColors, gameData } = props;
  const [updateDialog, toggleUpdateDialog] = React.useState(false);
  const [updateID, setUpdateID] = React.useState("");
  const [currentD, setCurrentD] = React.useState(0);

  const handleDelete = id => () => {
    Firestore.firestore()
      .collection("Ds")
      .doc(id)
      .delete();
  };

  const homeTeamColors = teamColors.find(
    team => team.team === gameData.homeTeam
  ).bkgdColor;
  const awayTeamColors = teamColors.find(
    team => team.team === gameData.awayTeam
  ).bkgdColor;

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
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stat, index) => (
            <TableRow
              hover
              style={
                stat.team === gameData.homeTeam
                  ? { backgroundColor: homeTeamColors }
                  : { backgroundColor: awayTeamColors }
              }
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{stat.D}</TableCell>
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
                    onClick={toggleDDialog(stat.id, index + 1)}
                  >
                    Update
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
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

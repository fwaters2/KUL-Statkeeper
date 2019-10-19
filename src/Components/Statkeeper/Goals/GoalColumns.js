import React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Button
} from "@material-ui/core";
import Firestore from '../../../Utils/Firebase'

export default function GoalColumns(props) {
  const { stats, teamColors, gameData } = props;

  const handleDelete = (id)=>() =>{
    Firestore.firestore().collection("Goals").doc(id).delete()
  }
  const homeTeamColors = teamColors.find(team=>team.team===gameData.homeTeam).bkgdColor
  const awayTeamColors = teamColors.find(team=>team.team===gameData.awayTeam).bkgdColor

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Assist</TableCell>
            <TableCell>Goal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(homeTeamColors)}
          {stats.map((stat, index) => (
            <TableRow
              
              // style={
              //   stat.team === gameData.homeTeam
              //     ? { backgroundColor: homeTeamColors }
              //     : { backgroundColor: awayTeamColors }
              // }
            >
              <TableCell>{index +1}</TableCell>
              <TableCell>{stat.Assist}</TableCell>
              <TableCell>{stat.Goal}</TableCell>
              <TableCell><Button onClick={handleDelete(stat.id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

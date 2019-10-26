import React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell
} from "@material-ui/core";

export default function DColumn(props) {
  const { stats, teamColors, gameData } = props;
  const homeTeamColors = teamColors.find(team=>team.team===gameData.homeTeam).bkgdColor
  const awayTeamColors = teamColors.find(team=>team.team===gameData.awayTeam).bkgdColor

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
            >{console.log(stat.team)}
              <TableCell>{index +1 }</TableCell>
              <TableCell>{stat.d}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

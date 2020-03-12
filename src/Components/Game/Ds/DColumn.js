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
import ClearIcon from "@material-ui/icons/Clear";
import { Edit } from "@material-ui/icons";

export default function DColumn(props) {
  const { ds, chooseDIdToUpdate, handleDDelete, playerID, setPlayerID } = props;

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
          {ds.map((d, index) => (
            <TableRow
              key={index}
              style={{ backgroundColor: d.teamColor + "66" }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{d.D}</TableCell>
              {index + 1 === ds.length ? (
                <TableCell padding="none">
                  <IconButton color="secondary" onClick={handleDDelete(d.id)}>
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              ) : (
                <TableCell padding="none">
                  <IconButton color="primary" onClick={chooseDIdToUpdate(d.id)}>
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
    </div>
  );
}

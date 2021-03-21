import { TableCell } from "@material-ui/core";
import React from "react";

export const TableCellTime = ({ children }) => {
  return (
    <TableCell
      style={{
        borderBottom: "none",
        paddingRight: 0,
        textAlign: "center",
      }}
    >
      {children}
    </TableCell>
  );
};

export const TableCellMatchButton = ({ children }) => {
  return (
    <TableCell style={{ width: "50%", borderBottom: "none" }}>
      {children}
    </TableCell>
  );
};

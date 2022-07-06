import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HistoryTableItem from "./HistoryTableItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

const rows = [
  createData("Talbi Omar", 159, 6.0, 24, 4.0, 3.99),
  createData("Soussi Amir", 237, 9.0, 37, 4.3, 4.99),
  createData("Zguerguer Wassim", 262, 16.0, 24, 6.0, 3.79),
  createData("foulen ben foulen", 305, 3.7, 67, 4.3, 2.5),
];

export default function HistoriqueGeneral() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow>
            <TableCell />
            <TableCell style={{ color: "#1976d2",fontWeight:"bold" }}>
              <AccountCircleIcon /> &nbsp;&nbsp;Client
            </TableCell>
            <TableCell style={{ color: "#1976d2",fontWeight:"bold" }} align="center">
              {" "}
              Devis Total <br />
              <PointOfSaleOutlinedIcon />
            </TableCell>
            <TableCell style={{ color: "#1976d2",fontWeight:"bold" }} align="center">
              .......
            </TableCell>
            <TableCell style={{ color: "#1976d2",fontWeight:"bold" }} align="center">
              .......
            </TableCell>
            <TableCell style={{ color: "#1976d2",fontWeight:"bold" }} align="center">
              .......
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <HistoryTableItem key={row.name} row={row} index={index}>

            </HistoryTableItem>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

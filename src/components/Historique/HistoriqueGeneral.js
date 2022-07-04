import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HistoryTableItem from "./HistoryTableItem";

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
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

const rows = [
  createData('Talbi Omar', 159, 6.0, 24, 4.0, 3.99),
  createData('Soussi Amir', 237, 9.0, 37, 4.3, 4.99),
  createData('Zguerguer Wassim', 262, 16.0, 24, 6.0, 3.79),
  createData('foulen ben foulen', 305, 3.7, 67, 4.3, 2.5),
];

export default function HistoriqueGeneral() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead  >
          <TableRow >
            <TableCell />
            <TableCell>Client</TableCell>
            <TableCell align="right">Devis Total</TableCell>
            <TableCell align="right">.......</TableCell>
            <TableCell align="right">.......</TableCell>
            <TableCell align="right">.......</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <HistoryTableItem key={row.name} row={row}> </HistoryTableItem>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

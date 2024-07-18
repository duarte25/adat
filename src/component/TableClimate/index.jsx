import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const climateMapping = {
  "clear": "Céu limpo",
  "rain": "Chuva",
  "unknown": "Desconhecidas",
  "drizzle": "Garoa/Chuvisco",
  "hail": "Granizo",
  "not_informed": "Não informado",
  "snow": "Neve",
  "fog": "Nevoeiro/névoa/fumaça",
  "cloudy": "Nublado",
  "other_conditions": "Outras condições",
  "strong_winds": "Ventos fortes"
};

export default function TableClimate({ data }) {
  
  const mappedData = data.map(item => ({
    ...item,
    climate: climateMapping[item.climate] || item.climate
  }));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Clima</TableCell>
            <TableCell align="right">Acidentes</TableCell>
            <TableCell align="right">Envolvidos</TableCell>
            <TableCell align="right">Óbitos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mappedData.map((row) => (
            <TableRow key={row.climate}>
              <TableCell component="th" scope="row">
                {row.climate}
              </TableCell>
              <TableCell align="right">{row.total_accident}</TableCell>
              <TableCell align="right">{row.total_involved}</TableCell>
              <TableCell align="right">{row.total_death}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

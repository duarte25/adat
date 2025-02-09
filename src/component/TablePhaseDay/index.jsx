import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { GiWindsock } from "react-icons/gi";
import { IoMdAlert } from "react-icons/io";
import { LuSearchX } from "react-icons/lu";
import { SiDrizzle } from "react-icons/si";
import { IoRainy } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import * as React from 'react';

const phaseDayMapping = {
  "afternoon": { name: "Tarde", icon: <MdSunny /> },
  "night": { name: "Noite", icon: <GiWindsock /> },
  "dawn": { name: "Madrugada", icon: <SiDrizzle /> },
  "morning": { name: "Manhã", icon: <IoRainy /> },
  "unknown": { name: "Desconhecido", icon: <LuSearchX /> },
  "not_informed": { name: "Não informado", icon: <IoMdAlert /> },
};

export default function TablePhaseDay({ data }) {

  const mappedData = data.map(item => ({
    ...item,
    phaseDay: phaseDayMapping[item.phaseDay] || { name: item.phaseDay, icon: null }
  }));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className="bg-beige">
            <TableCell className="text-xl">Clima</TableCell>
            <TableCell className="text-xl" align="center">Acidentes</TableCell>
            <TableCell className="text-xl" align="center">Envolvidos</TableCell>
            <TableCell className="text-xl" align="center">Feridos</TableCell>
            <TableCell className="text-xl" align="center">Óbitos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="bg-yale-blue" >
          {mappedData.map((row) => (
            <TableRow key={row.phaseDay.name}>
              <TableCell className="text-snow-white text-xl" component="th" scope="row">
                <div className="flex flex-row items-center content-center gap-1 text-xl" >
                  {row.phaseDay.icon}
                  <span>{row.phaseDay.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-snow-white -yal text-xl" align="center">{row.total_accident}</TableCell>
              <TableCell className="text-snow-white text-xl" align="center">{row.total_involved}</TableCell>
              <TableCell className="text-snow-white text-xl" align="center">{row.total_injured}</TableCell>
              <TableCell className="text-snow-white text-xl" align="center">{row.total_death}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

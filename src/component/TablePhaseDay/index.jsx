import { IoIosCloudyNight, IoMdAlert } from "react-icons/io";
import TableContainer from '@mui/material/TableContainer';
import { LuSearchX, LuSunrise } from "react-icons/lu";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { GiNightSky } from "react-icons/gi";
import { MdSunny } from "react-icons/md";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import * as React from 'react';

// Mapeamento para phase_day
const phaseDayMapping = {
  "morning": { name: "Manhã", icon: <LuSunrise /> },
  "afternoon": { name: "Tarde", icon: <MdSunny /> },
  "night": { name: "Noite", icon: <IoIosCloudyNight /> },
  "dawn": { name: "Madrugada", icon: <GiNightSky /> },
  "unknown": { name: "Desconhecido", icon: <LuSearchX /> },
  "not_informed": { name: "Não informado", icon: <IoMdAlert /> },
};

// Mapeamento para day_week
const dayWeekMapping = {
  "sunday": { name: "Domingo" },
  "monday": { name: "Segunda-feira" },
  "tuesday": { name: "Terça-feira" },
  "wednesday": { name: "Quarta-feira" },
  "thursday": { name: "Quinta-feira" },
  "friday": { name: "Sexta-feira" },
  "saturday": { name: "Sábado" },
};

export default function TablePhaseDay({ data, searchType }) {

  // Escolhe o mapeamento correto com base no tipo de busca
  const mapping = searchType === "day_week" ? dayWeekMapping : phaseDayMapping;

  const mappedData = data.map(item => ({
    ...item,
    category: mapping[item.phaseDay] || mapping[item.dayWeek] || { name: item.phaseDay || item.dayWeek, icon: null }
  }));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className="bg-beige">
            <TableCell className="text-xl">Categoria</TableCell>
            <TableCell className="text-xl" align="center">Acidentes</TableCell>
            <TableCell className="text-xl" align="center">Envolvidos</TableCell>
            <TableCell className="text-xl" align="center">Feridos</TableCell>
            <TableCell className="text-xl" align="center">Óbitos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="bg-yale-blue">
          {mappedData.map((row) => (
            <TableRow key={row.category.name}>
              <TableCell className="text-snow-white text-xl" component="th" scope="row">
                <div className="flex flex-row items-center content-center gap-1 text-xl">
                  {row.category.icon}
                  <span>{row.category.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-snow-white text-xl" align="center">{row.total_accident}</TableCell>
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

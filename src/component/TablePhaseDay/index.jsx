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
import { TableSortLabel } from "@mui/material";
import { useMemo, useState } from "react";
import { getComparator } from "../TableClimate";

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

// Mapeamento para month
const monthMapping = {
  "01": { name: "Janeiro" },
  "02": { name: "Fevereiro" },
  "03": { name: "Março" },
  "04": { name: "Abril" },
  "05": { name: "Maio" },
  "06": { name: "Junho" },
  "07": { name: "Julho" },
  "08": { name: "Agosto" },
  "09": { name: "Setembro" },
  "10": { name: "Outubro" },
  "11": { name: "Novembro" },
  "12": { name: "Dezembro" },
};

export default function TablePhaseDay({ data, searchType, isLoading }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  // Escolhe o mapeamento correto com base no tipo de busca
  const mapping = searchType === "day_week" ? dayWeekMapping :
    searchType === "month" ? monthMapping :
      phaseDayMapping;


  const allCategories = Object.keys(mapping).map(key => ({
    category: mapping[key],
    key,
    total_accident: 0,
    total_involved: 0,
    total_injured: 0,
    total_death: 0,
  }));

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const mergedData = useMemo(() => {
    return allCategories.map(categoryItem => {
      const found = data.find(item => item.phaseDay === categoryItem.key ||
        item.dayWeek === categoryItem.key ||
        item.month === categoryItem.key);

      return found ? { ...categoryItem, ...found } : categoryItem;
    });
  }, [data, allCategories]);

  const sortedData = useMemo(() => {
    if (!orderBy) return mergedData;

    return [...mergedData].sort(getComparator(order, orderBy));
  }, [mergedData, order, orderBy]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="sortable table">
        <TableHead>
          <TableRow className="bg-beige">
            <TableCell className="text-xl">Categoria</TableCell>

            <TableCell className="text-xl" align="center">
              <TableSortLabel
                active={orderBy === 'total_accident'}
                direction={orderBy === 'total_accident' ? order : 'asc'}
                onClick={() => handleRequestSort('total_accident')}
              >
                Acidentes
              </TableSortLabel>
            </TableCell>

            <TableCell className="text-xl" align="center">
              <TableSortLabel
                active={orderBy === 'total_involved'}
                direction={orderBy === 'total_involved' ? order : 'asc'}
                onClick={() => handleRequestSort('total_involved')}
              >
                Envolvidos
              </TableSortLabel>
            </TableCell>

            <TableCell className="text-xl" align="center">
              <TableSortLabel
                active={orderBy === 'total_injured'}
                direction={orderBy === 'total_injured' ? order : 'asc'}
                onClick={() => handleRequestSort('total_injured')}
              >
                Feridos
              </TableSortLabel>
            </TableCell>

            <TableCell className="text-xl" align="center">
              <TableSortLabel
                active={orderBy === 'total_death'}
                direction={orderBy === 'total_death' ? order : 'asc'}
                onClick={() => handleRequestSort('total_death')}
              >
                Óbitos
              </TableSortLabel>
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody className="bg-yale-blue">
          {isLoading ? (
            // Renderiza linhas falsas enquanto carrega
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={5}>
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-700 h-6 w-6"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-slate-700 rounded"></div>
                      <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            sortedData.map((row) => (
              <TableRow key={row.category.name}>
                <TableCell style={{ color: "white" }} className="text-white text-xl" component="th" scope="row">
                  <div className="flex flex-row items-center content-center gap-1 text-xl">
                    {row.category.icon}
                    <span>{row.category.name}</span>
                  </div>
                </TableCell>
                <TableCell style={{ color: "white" }} className="text-white text-xl" align="center">{row.total_accident}</TableCell>
                <TableCell style={{ color: "white" }} className="text-white text-xl" align="center">{row.total_involved}</TableCell>
                <TableCell style={{ color: "white" }} className="text-white text-xl" align="center">{row.total_injured}</TableCell>
                <TableCell style={{ color: "white" }} className="text-white text-xl" align="center">{row.total_death}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import * as React from 'react';

import { MdSunny } from "react-icons/md";
import { IoRainy } from "react-icons/io5";
import { SiDrizzle } from "react-icons/si";
import { GiWindsock } from "react-icons/gi";
import { RiSunFoggyFill } from "react-icons/ri";
import { IoMdCloudyNight } from "react-icons/io";
import { BsSnow2, BsCloudHailFill } from "react-icons/bs";
import { IoMdAlert } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";
import { LuSearchX } from "react-icons/lu";

const climateMapping = {
  "clear": { name: "Céu limpo", icon: <MdSunny /> },
  "strong_winds": { name: "Ventos fortes", icon: <GiWindsock /> },
  "drizzle": { name: "Garoa/Chuvisco", icon: <SiDrizzle /> },
  "rain": { name: "Chuva", icon: <IoRainy /> },
  "fog": { name: "Nevoeiro/névoa/fumaça", icon: <RiSunFoggyFill /> },
  "cloudy": { name: "Nublado", icon: <IoMdCloudyNight /> },
  "snow": { name: "Neve", icon: <BsSnow2 /> },
  "hail": { name: "Granizo", icon: <BsCloudHailFill /> },
  "unknown": { name: "Desconhecidas", icon: <LuSearchX /> },
  "not_informed": { name: "Não informado", icon: <IoMdAlert /> },
  "other_conditions": { name: "Outras condições", icon: <CgDetailsMore /> },
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function TableClimate({ data, isLoading }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const mappedData = data.map(item => ({
    ...item,
    climate: climateMapping[item.climate] || { name: item.climate, icon: null }
  }));

  const sortedData = React.useMemo(() => {
    return orderBy
      ? [...mappedData].sort(getComparator(order, orderBy))
      : mappedData;
  }, [mappedData, order, orderBy]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="sortable table">
        <TableHead>
          <TableRow className="bg-beige">
            <TableCell className="text-xl">Clima</TableCell>

            <TableCell align="center" className="text-xl">
              <TableSortLabel
                active={orderBy === 'total_accident'}
                direction={orderBy === 'total_accident' ? order : 'asc'}
                onClick={() => handleRequestSort('total_accident')}
              >
                Acidentes
              </TableSortLabel>
            </TableCell>

            <TableCell align="center" className="text-xl">
              <TableSortLabel
                active={orderBy === 'total_involved'}
                direction={orderBy === 'total_involved' ? order : 'asc'}
                onClick={() => handleRequestSort('total_involved')}
              >
                Envolvidos
              </TableSortLabel>
            </TableCell>

            <TableCell align="center" className="text-xl">
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
                <TableCell colSpan={4}>
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
              <TableRow key={row.climate.name}>
                <TableCell
                  style={{ color: "white" }}
                  className="text-white text-xl"
                  component="th"
                  scope="row"
                >
                  <div className="flex flex-row items-center gap-1">
                    {row.climate.icon}
                    <span>{row.climate.name}</span>
                  </div>
                </TableCell>

                <TableCell style={{ color: "white" }} align="center">
                  {row.total_accident}
                </TableCell>

                <TableCell style={{ color: "white" }} align="center">
                  {row.total_involved}
                </TableCell>

                <TableCell style={{ color: "white" }} align="center">
                  {row.total_death}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

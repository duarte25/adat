import * as React from 'react';
import Styles from './styles.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MdSunny } from "react-icons/md";
import { IoRainy } from "react-icons/io5";
import { SiDrizzle } from "react-icons/si";
import { GiWindsock } from "react-icons/gi";
import { RiSunFoggyFill } from "react-icons/ri";
import { IoMdCloudyNight } from "react-icons/io";
import { BsSnow2 } from "react-icons/bs";
import { BsCloudHailFill } from "react-icons/bs";
import { IoMdAlert } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";

const climateMapping = {
  "clear": { name: "Céu limpo", icon: <MdSunny className={Styles.icon} /> },
  "strong_winds": { name: "Ventos fortes", icon: <GiWindsock className={Styles.icon} /> },
  "drizzle": { name: "Garoa/Chuvisco", icon: <SiDrizzle className={Styles.icon} /> },
  "rain": { name: "Chuva", icon: <IoRainy className={Styles.icon} /> },
  "fog": { name: "Nevoeiro/névoa/fumaça", icon: <RiSunFoggyFill className={Styles.icon} /> },
  "cloudy": { name: "Nublado", icon: <IoMdCloudyNight className={Styles.icon} /> },
  "snow": { name: "Neve", icon: <BsSnow2 className={Styles.icon} /> },
  "hail": { name: "Granizo", icon: <BsCloudHailFill className={Styles.icon} /> },
  "unknown": { name: "Desconhecidas", icon: <IoMdAlert className={Styles.icon} /> },
  "not_informed": { name: "Não informado", icon: <IoMdAlert className={Styles.icon} /> },
  "other_conditions": { name: "Outras condições", icon: <CgDetailsMore className={Styles.icon} /> },
};

export default function TableClimate({ data }) {

  const mappedData = data.map(item => ({
    ...item,
    climate: climateMapping[item.climate] || { name: item.climate, icon: null }
  }));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className={Styles.header}>
            <TableCell className={Styles.tableCellHeader}>Clima</TableCell>
            <TableCell className={Styles.tableCellHeader} align="center">Acidentes</TableCell>
            <TableCell className={Styles.tableCellHeader} align="center">Envolvidos</TableCell>
            <TableCell className={Styles.tableCellHeader} align="center">Óbitos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={Styles.column}>
          {mappedData.map((row) => (
            <TableRow className={Styles.tableRow} key={row.climate.name}>
              <TableCell className={`${Styles.tableCellColumn} ${Styles.iconName}`} component="th" scope="row">
                <div className={Styles.icon} >
                  {row.climate.icon}
                  <span>{row.climate.name}</span>
                </div>
              </TableCell>
              <TableCell className={Styles.tableCellColumn} align="center">{row.total_accident}</TableCell>
              <TableCell className={Styles.tableCellColumn} align="center">{row.total_involved}</TableCell>
              <TableCell className={Styles.tableCellColumn} align="center">{row.total_death}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

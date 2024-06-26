"use client"
import React from "react";
import { Chart } from "react-google-charts";
import Filters from "../component/Filters";
import Styles from "./page.module.css";
import Select from "../component/InputSelect";

export const data = [
  ['Region', 'Views'],
  ['Acre', 0],
  ['Alagoas', 1],
  ['Amapá', 2],
  ['Amazonas', 3],
  ['Bahia', 4],
  ['Ceará', 1],
  ['Distrito Federal', 2],
  ['Espírito Santo', 3],
  ['Goiás', 0],
  ['Maranhão', 5],
  ['Mato Grosso', 0],
  ['Mato Grosso do Sul', 1],
  ['Minas Gerais', 2],
  ['Pará', 3],
  ['Paraíba', 4],
  ['Paraná', 3],
  ['Pernambuco', 2],
  ['Piauí', 4],
  ['Rio de Janeiro', 1],
  ['Rio Grande do Norte', 0],
  ['Rio Grande do Sul', 1],
  ['Rondônia', 5],
  ['Roraima', 2],
  ['Santa Catarina', 4],
  ['São Paulo', 3],
  ['Sergipe', 2],
  ['Tocantins', 0]
];

export const options = {
  region: "BR",
  resolution: 'provinces',
  colorAxis: { colors: ["#00853f", "black", "#e31b23"] },
  backgroundColor: "#81d4fa",
  datalessRegionColor: "#f8bbd0",
  defaultColor: "#f5f5f5",
};

export default function App() {
  const menuData = [
    { value: 10, label: "2021" },
    { value: 20, label: "2022" },
    { value: 30, label: "2023" },
  ];

  return (
    <div className={Styles.container}>
      <Filters inputSelect={
        <>
          <Select data={menuData} selectLabel={"Age"} />
          {/* <Select data={menuData} selectLabel={"Gender"} /> */}
        </>
      } />
      {/* <Chart
        chartType="GeoChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      /> */}
    </div>
  );
}
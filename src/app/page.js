"use client"
import React from "react";
import { Chart } from "react-google-charts";
import Header from "./component/Header";
import Filter from "./component/PrincipalFilter";
import Styles from "./page.module.css";

export const data = [
  ['Region','Views'],
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

export function App() {
  return (
    <div className={Styles.container}>
      <Header />
      <Filter/>
      <Chart
        chartType="GeoChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default App;
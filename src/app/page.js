"use client"
import React, { useState } from "react";
import { Chart } from "react-google-charts";
import Filters from "../component/Filters";
import Styles from "./page.module.css";
import InputSelect from "../component/InputSelect";
import { fetchApi } from "../utils/fetchApi.js";
import { useQuery } from "react-query";

// Mapeamento de siglas para nomes completos dos estados
const ufFullName = {
  "AC": "Acre",
  "AL": "Alagoas",
  "AP": "Amapá",
  "AM": "Amazonas",
  "BA": "Bahia",
  "CE": "Ceará",
  "DF": "Distrito Federal",
  "ES": "Espírito Santo",
  "GO": "Goiás",
  "MA": "Maranhão",
  "MT": "Mato Grosso",
  "MS": "Mato Grosso do Sul",
  "MG": "Minas Gerais",
  "PA": "Pará",
  "PB": "Paraíba",
  "PR": "Paraná",
  "PE": "Pernambuco",
  "PI": "Piauí",
  "RJ": "Rio de Janeiro",
  "RN": "Rio Grande do Norte",
  "RS": "Rio Grande do Sul",
  "RO": "Rondônia",
  "RR": "Roraima",
  "SC": "Santa Catarina",
  "SP": "São Paulo",
  "SE": "Sergipe",
  "TO": "Tocantins"
};

export default function App() {
  const [metric, setMetric] = useState("Acidentes");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["veiculoGetInformacoes"],
    queryFn: async () => {
      const response = await fetchApi("/uf", "GET");
      return response;
    }
  });

  const handleSelectChange = (event) => {
    setMetric(event.target.value);
  };

  const getMetricData = (metric, data) => {
    const dataUf = [['State', metric]];
    if (data) {
      Object.keys(data).forEach(uf => {
        const { count, total_death, total_involved } = data[uf];
        const fullName = ufFullName[uf];
        if (fullName) {
          if (metric === "Acidentes") {
            dataUf.push([fullName, count]);
          } else if (metric === "Óbitos") {
            dataUf.push([fullName, total_death]);
          } else if (metric === "Envolvidos") {
            dataUf.push([fullName, total_involved]);
          }
        }
      });
    }
    return dataUf;
  };

  const options = {
    region: "BR",
    resolution: 'provinces',
    colorAxis: { colors: ["#00853f", "black", "#e31b23"] },
    backgroundColor: "#81d4fa",
    datalessRegionColor: "#f8bbd0",
    defaultColor: "#f5f5f5",
  };

  const menuData = [
    { value: "Acidentes", label: "Acidentes" },
    { value: "Óbitos", label: "Óbitos" },
    { value: "Envolvidos", label: "Envolvidos" },
  ];

  return (
    <div className={Styles.container}>
      <Filters inputSelect={
        <InputSelect
          data={menuData}
          selectLabel={"Metric"}
          onChange={handleSelectChange}
          value={metric}
        />
      } />
      <div className={Styles.map}>
        <Chart
          chartType="GeoChart"
          data={getMetricData(metric, data)}
          options={options}
        />
      </div>
    </div>
  );
}

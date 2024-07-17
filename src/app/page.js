"use client";

import React, { useState } from "react";
import { Chart } from "react-google-charts";
import Filters from "../component/Filters";
import Styles from "./page.module.css";
import InputSelect from "../component/InputSelect";
import { fetchApi } from "../utils/fetchApi";
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
  const [year, setYear] = useState("2022");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["veiculoGetInformacoes", year],
    queryFn: async () => {
      const response = await fetchApi(`/uf?dados=dados_uf_${year}`, "GET");
      return response;
    }
  });

  const handleMetricChange = (event) => {
    setMetric(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const getMetricData = (metric, data) => {
    const dataUf = [['State', metric]];
    if (data) {
      Object.keys(data).forEach(uf => {
        const { total_accident, total_death, total_involved } = data[uf];
        const fullName = ufFullName[uf];
        if (fullName) {
          if (metric === "Acidentes") {
            dataUf.push([fullName, total_accident]);
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
    displayMode: "regions",
    resolution: 'provinces',
    colorAxis: { colors: ["#70b0f5", "#083D77"] }, // Esquema de cores para destacar o Brasil
    backgroundColor: "#F9F9F9", // Cor de fundo do mapa
    datalessRegionColor: "#FFFFFF", // Cor para regiões sem dados (branco)
    defaultColor: "#f5f5f5", // Cor padrão das regiões não destacadas
    enableRegionInteractivity: true, // Ativar interatividade ao passar o mouse
    magnifyingGlass: { enable: true, zoomFactor: 7.5 } // Lupa de zoom no Brasil
  };

  const menuData = [
    { value: "Acidentes", label: "Acidentes" },
    { value: "Óbitos", label: "Óbitos" },
    { value: "Envolvidos", label: "Envolvidos" },
  ];

  const yearData = [
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
  ];

  return (
    <div className={Styles.container}>

      <div className={Styles.filterData}>
        <div className={Styles.title}><hr className={Styles.hrTitle} /><h2>ESTATÍSTICA DE ACIDENTES POR <strong>ESTADO</strong></h2></div>
        <Filters inputSelect={
          <>
            <InputSelect
              data={menuData}
              selectLabel={"Métrica"}
              onChange={handleMetricChange}
              value={metric}
            />
            <InputSelect
              data={yearData}
              selectLabel={"Ano"}
              onChange={handleYearChange}
              value={year}
            />
          </>
        } />
      </div>
      <div className={Styles.map}>
        {isLoading ? (
          <p>Carregando...</p>
        ) : isError ? (
          <p>Erro: {error.message}</p>
        ) : (
          <Chart
            chartType="GeoChart"
            data={getMetricData(metric, data)}
            options={options}
          />
        )}
      </div>

    </div>
  );
}

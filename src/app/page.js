"use client";

import InputSelect from "../component/InputSelect";
import { fetchApi } from "../utils/fetchApi";
import { Chart } from "react-google-charts";
import Filters from "../component/Filters";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";

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
  const [selectedMetric, setSelectedMetric] = useState("Acidentes");
  const [selectedYear, setSelectedYear] = useState("2022");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["ufGetInformacoes", selectedYear],
    queryFn: async () => {
      const response = await fetchApi(`/uf?data=data_uf_${selectedYear}`, "GET");
      return response;
    }
  });

  const handleMetricChange = (event) => {
    setMetric(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleFetchData = () => {
    setSelectedMetric(metric);
    setSelectedYear(year);
    refetch();
  };

  const getMetricData = (metric, data) => {
    const dataUf = [['State', metric]];
    if (data) {
      Object.keys(data).forEach(uf => {
        const { total_accident, total_death, total_involved, total_injured } = data[uf];
        const fullName = ufFullName[uf];
        if (fullName) {
          if (metric === "Acidentes") {
            dataUf.push([fullName, total_accident]);
          } else if (metric === "Óbitos") {
            dataUf.push([fullName, total_death]);
          } else if (metric === "Envolvidos") {
            dataUf.push([fullName, total_involved]);
          } else if (metric === "Feridos") {
            dataUf.push([fullName, total_injured]);
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
    colorAxis: { colors: ["#70b0f5", "#083D77"] },
    backgroundColor: "#F9F9F9", // Podemos passar para branco para confundir com o fundo
    datalessRegionColor: "#FFFFFF",
    defaultColor: "#f5f5f5",
    enableRegionInteractivity: true,
    magnifyingGlass: { enable: true, zoomFactor: 7.5 }
  };

  const menuData = [
    { value: "Acidentes", label: "Acidentes" },
    { value: "Óbitos", label: "Óbitos" },
    { value: "Envolvidos", label: "Envolvidos" },
    { value: "Feridos", label: "Feridos" }
  ];

  const yearData = [
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
  ];

  return (
    <div className="flex flex-col items-center pt-5 gap-5">
      <div className="w-1/2">
        <div className="flex flex-row mb-1">
          <hr className="mr-1 bg-yale-blue h-5 w-1" />
          <h2>ESTATÍSTICA DE ACIDENTES POR <strong>ESTADO</strong></h2>
        </div>
        <Filters
          inputSelect={
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
          }
          onButtonClick={handleFetchData}
        />
      </div>
      <div className="h-4/5 w-full px-10">
        {isLoading ? (
          <div className="flex justify-center items-center"> 
            <CircularProgress color="inherit" className="fixed z-[10] h-32 w-34" />
          </div>
        ) : isError ? (
          <p>Erro: {error.message}</p>
        ) : (
          <Chart
            chartType="GeoChart"
            data={getMetricData(selectedMetric, data)}
            options={options}
          />
        )}
      </div>
    </div>
  );
}

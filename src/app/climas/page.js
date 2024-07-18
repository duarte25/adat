"use client";

import React, { useState } from "react";
import Filters from "../../component/Filters";
import Styles from "./styles.module.css";
import InputSelect from "../../component/InputSelect";
import { fetchApi } from "../../utils/fetchApi";
import { useQuery } from "react-query";
import Table from "../../component/TableClimate" ;


export default function Climas() {
  const [metric, setMetric] = useState("Acidentes");
  const [year, setYear] = useState("2022");
  const [selectedMetric, setSelectedMetric] = useState("Acidentes");
  const [selectedYear, setSelectedYear] = useState("2022");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["climateGetInformacoes", selectedYear],
    queryFn: async () => {
      const response = await fetchApi(`/climate?dados=dados_uf_${selectedYear}`, "GET");
      return response;
    },
    enabled: false  // Disable automatic fetching
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
      <div className={Styles.map}>
        {isLoading ? (
          <p>Carregando...</p>
        ) : isError ? (
          <p>Erro: {error.message}</p>
        ) : (
          <Table />
        )}
      </div>
    </div>
  );
}

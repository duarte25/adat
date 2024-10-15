"use client";

import React, { useState } from "react";
import { Chart } from "react-google-charts";
import Filters from "../../component/Filters";
import Styles from "./styles.module.css";
import InputSelect from "../../component/InputSelect";
import { fetchApi } from "../../utils/fetchApi";
import { useQuery } from "react-query";
import GraphPie from "@/component/graphHighway/graphPie";

const highwayFullName = {
  "asphalt": "Asfalto",
  "concrete": "Concreto",
  "earth": "Terra",
  "gravel": "Cascalho",
  "not_informed": "Não informado",
  "paving_stone": "Paralelepípedo",
  "unknown": "Desconhecido"
};

export default function Road() {
  const [metric, setMetric] = useState("Envolvidos");
  const [year, setYear] = useState("2022");
  const [selectedMetric, setSelectedMetric] = useState("Acidentes");
  const [selectedYear, setSelectedYear] = useState("2022");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["highwayGetInformacoes", selectedYear],
    queryFn: async () => {
      const response = await fetchApi(`/highway?data=data_highway_${selectedYear}`, "GET");
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
    const chartsData = [];

    if (data) {
      Object.keys(data).forEach((highway) => {
        const { total_accident, total_death, total_involved, total_injured } = data[highway];
        const fullName = highwayFullName[highway];

        if (fullName) {
          const dataHighway = [['Categoria', metric]];
          if (metric === "Acidentes") {
            dataHighway.push(["Acidentes", total_accident]);
          } else if (metric === "Envolvidos") {
            dataHighway.push(["Óbitos", total_death], ["Envolvidos", total_involved], ["Feridos", total_injured]);
          }

          chartsData.push({
            highway: fullName,
            data: dataHighway
          });
        }
      });
    }

    return chartsData;
  };

  const menuData = [
    { value: "Acidentes", label: "Acidentes" },
    { value: "Envolvidos", label: "Envolvidos" }
  ];

  const yearData = [
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
  ];

  const metricData = getMetricData(selectedMetric, data);

  return (
    <div className={Styles.container}>
      <div className={Styles.filterData}>
        <div className={Styles.title}>
          <hr className={Styles.hrTitle} />
          <h2>ESTATÍSTICA DE ACIDENTES POR <strong>TIPOS DE PISTAS</strong></h2>
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

      <div className={Styles.graphs}>
        {metric === "Envolvidos" ? (
          // Renderiza o componente GraphPie quando a métrica é "Acidentes"
          <GraphPie data={metricData} />
        ) : (
          <h1>Não é o que eu quero</h1>
        )}
      </div>
    </div>
  );
}

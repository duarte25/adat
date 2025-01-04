"use client";

import React, { useState } from "react";
import Filters from "../../component/Filters";
import Styles from "./styles.module.css";
import InputSelect from "../../component/InputSelect";
import { fetchApi } from "../../utils/fetchApi";
import { useQuery } from "react-query";
import TableClimate from "../../component/TableClimate";

export default function Climate() {
  const [year, setYear] = useState("2022");
  const [selectedYear, setSelectedYear] = useState("2022");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["ufGetInformacoes", selectedYear],
    queryFn: async () => {
      const response = await fetchApi(`/climate?data=data_climate_${selectedYear}`, "GET");
      return response;
    },
  });

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleFetchData = () => {
    setSelectedYear(year);
    refetch();
  };

  const getMetricData = (data) => {
    const dataClimate = [];
    if (data) {
      Object.keys(data).forEach(climate => {
        const { total_accident, total_death, total_involved } = data[climate];
        dataClimate.push({
          climate,
          total_accident,
          total_death,
          total_involved,
        });
      });
    }
    return dataClimate;
  };

  const yearData = [
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
  ];

  const tableData = getMetricData(data);

  return (
    <div className={Styles.container}>
      <div className={Styles.filterData}>
        <div className={Styles.title}><hr className={Styles.hrTitle} /><h2>ESTATÍSTICA DE ACIDENTES POR <strong>CLIMA E TEMPO</strong></h2></div>
        <Filters
          inputSelect={
            <>
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
      <div className={Styles.table}>
        {isLoading ? (
          <p>Carregando...</p>
        ) : isError ? (
          <p>Erro: {error.message}</p>
        ) : (
          <TableClimate data={tableData} />
        )}
      </div>
    </div>
  );
}

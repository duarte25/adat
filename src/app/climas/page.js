"use client";

import TableClimate from "../../component/TableClimate";
import InputSelect from "../../component/InputSelect";
import { fetchApi } from "../../utils/fetchApi";
import Filters from "../../component/Filters";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";

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
    <div className="flex flex-col items-center pt-5 gap-5">
      <div className="w-1/2">
        <div className="flex flex-row mb-1">
          <hr className="mr-1 bg-yale-blue h-5 w-1" />
          <h2>ESTATÍSTICA DE ACIDENTES POR <strong>CLIMA E TEMPO</strong></h2>
        </div>
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
      <div className="h-4/5 w-4/5" >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <CircularProgress color="inherit" className="fixed z-[10] h-32 w-34" />
          </div>
        ) : isError ? (
          <p>Erro: {error.message}</p>
        ) : (
          <TableClimate data={tableData} />
        )}
      </div>
    </div>
  );
}

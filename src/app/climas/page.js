"use client";

import { handleErrorMessages } from "@/errors/handleErrorMessage";
import TableClimate from "../../component/TableClimate";
import InputSelect from "../../component/InputSelect";
import { SpinnerCircular } from "spinners-react";
import { fetchApi } from "../../utils/fetchApi";
import Filters from "../../component/Filters";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Climate() {
  const [year, setYear] = useState("2022");

  const { data, isLoading, error } = useQuery({
    queryKey: ["ufGetInformacoes", year],
    queryFn: async () => {
      const response = await fetchApi(`/climate?data=data_climate_${year}`, "GET");
      return response;
    },
  });

  const getMetricData = (data) => {
    if (!data) return [];
    const dataClimate = [];
    if (data) {
      Object.keys(data).forEach(climate => {
        const { total_accident, total_death, total_injured, total_involved } = data[climate];
        dataClimate.push({
          climate,
          total_accident,
          total_death,
          total_injured,
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

  const tableData = getMetricData(data) || [];

  useEffect(() => {
    if (error) {
      handleErrorMessages(error?.response?.data?.errors || []);
    }
  }, [error]);

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
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </>
          }
        />
      </div>
      <div className="relative h-4/5 w-4/5">
        <TableClimate data={tableData} isLoading={isLoading} />
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
            <SpinnerCircular
              size={60}
              thickness={150}
              speed={100}
              color="#083D77"
              secondaryColor="rgba(0, 0, 0, 0.2)"
            />
          </div>
        )}
      </div>
    </div>
  );
}
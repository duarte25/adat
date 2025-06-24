"use client"

import InputSelect from "../../component/InputSelect";
import TablePhaseDay from "@/component/TablePhaseDay";
import { SpinnerCircular } from "spinners-react";
import { fetchApi } from "../../utils/fetchApi";
import Filters from "../../component/Filters";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { handleErrorMessages } from "@/errors/handleErrorMessage";

export default function Calendario() {
  const [year, setYear] = useState("2022");
  const [selectedSearch, setSelectedSearch] = useState("phase_day");

  const { data, isLoading, error } = useQuery({
    queryKey: ["ufGetInformacoes",  selectedSearch, year],
    queryFn: async () => {
      const response = await fetchApi(`/${selectedSearch}?data=data_${selectedSearch}_${year}`, "GET");
      return response;
    },
  });

  const handleSearchChange = (event) => {
    setSelectedSearch(event.target.value);
  };

  const getMetricData = (data) => {
    const dataPhaseDay = [];
    if (data) {
      Object.keys(data).forEach(phaseDay => {
        const { total_accident, total_death, total_involved, total_injured } = data[phaseDay];
        dataPhaseDay.push({
          phaseDay,
          total_accident,
          total_death,
          total_involved,
          total_injured
        });
      });
    }
    return dataPhaseDay;
  };

  const yearData = [
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
  ];

  const searchData = [
    { value: "phase_day", label: "Fase do Dia" },
    { value: "day_week", label: "Dia da Semana" },
    { value: "month", label: "Mês" }
  ];

  const tableData = getMetricData(data);

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
          <h2>ESTATÍSTICA DE ACIDENTES POR <strong>CALENDÁRIO</strong></h2>
        </div>
        <Filters
          inputSelect={
            <>
              <InputSelect
                data={yearData}
                selectLabel={"Ano"}
                // onChange={handleYearChange}
                onChange={(e) => setYear(e.target.value)}
                value={year}
              />

              <InputSelect
                data={searchData}
                selectLabel={"Filtro"}
                onChange={handleSearchChange}
                value={selectedSearch}
              />
            </>
          }
        />
      </div>
      <div className="relative h-4/5 w-4/5">
        <TablePhaseDay data={tableData} searchType={selectedSearch} isLoading={isLoading} />
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

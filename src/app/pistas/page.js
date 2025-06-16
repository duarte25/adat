"use client";

import GraphBarLine from "@/component/graphHighway/graphBarLine";
import GraphPieBar from "@/component/graphHighway/graphPieBar";
import InputSelect from "../../component/InputSelect";
import { SpinnerCircular } from "spinners-react";
import { fetchApi } from "../../utils/fetchApi";
import Filters from "../../component/Filters";
import { useQuery } from "react-query";
import { useState } from "react";

const highwayFullName = {
  "ASFALTO": "Asfalto",
  "CONCRETO": "Concreto",
  "TERRA": "Terra",
  "CASCALHO": "Cascalho",
  "NAO INFORMADO": "Não informado",
  "PARALELEPIPEDO": "Paralelepípedo",
  "DESCONHECIDO": "Desconhecido",
  "SIM": "Sim",
  "NAO": "Não"
};

export default function Road() {
  const [metric, setMetric] = useState("Acidentes");
  const [year, setYear] = useState("2022");

  const { data: highwayData, isLoading: isHighwayLoading, isError: isHighwayError } = useQuery({
    queryKey: ["highwayGetInformacoes", year],
    queryFn: async () => {
      const response = await fetchApi(`/highway?data=data_highway_${year}`, "GET");
      return response;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: guardrailData, isLoading: isGuardrailLoading, isError: isGuardrailError } = useQuery({
    queryKey: ["guardrailGetInformacoes", year],
    queryFn: async () => {
      const response = await fetchApi(`/guardrail?data=data_guardrail_${year}`, "GET");
      return response;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: medianData, isLoading: isMedianLoading, isError: isMedianError } = useQuery({
    queryKey: ["medianGetInformacoes", year],
    queryFn: async () => {
      const response = await fetchApi(`/median?data=data_median_${year}`, "GET");
      return response;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: shoulderData, isLoading: isShoulderLoading, isError: isShoulderError } = useQuery({
    queryKey: ["shoulderGetInformacoes", year],
    queryFn: async () => {
      const response = await fetchApi(`/shoulder?data=data_shoulder_${year}`, "GET");
      return response;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: speedData, isLoading: isSpeedLoading, isError: isSpeedError } = useQuery({
    queryKey: ["SpeedGetInformacoes", year],
    queryFn: async () => {
      const response = await fetchApi(`/speed?data=data_speed_${year}`, "GET");
      return response;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const getMetricData = (metric, data) => {
    const chartsData = [];

    if (data) {
      Object.keys(data).forEach((highway) => {
        const { total_accident, total_death, total_involved, total_injured } = data[highway];
        const fullName = highwayFullName[highway] || highway;

        const dataHighway = [["Categoria", metric]];
        if (metric === "Acidentes") {
          dataHighway.push(["Acidentes", total_accident]);
        } else if (metric === "Envolvidos") {
          dataHighway.push(
            ["Óbitos", total_death],
            ["Envolvidos", total_involved],
            ["Feridos", total_injured]
          );
        }

        chartsData.push({
          highway: fullName,
          data: dataHighway
        });
      });
    }

    return chartsData;
  };

  const highwayMetricData = getMetricData(metric, highwayData);
  const guardrailMetricData = getMetricData(metric, guardrailData);
  const medianMetricData = getMetricData(metric, medianData);
  const shoulderMetricData = getMetricData(metric, shoulderData);
  const speedMetricData = getMetricData(metric, speedData);

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

  const isLoading =
    isHighwayLoading ||
    isGuardrailLoading ||
    isMedianLoading ||
    isShoulderLoading ||
    isSpeedLoading ||
    isSpeedError;

  return (
    <div className="flex flex-col items-center pt-5 gap-5">
      <div className="w-1/2">
        <div className="flex flex-row mb-1">
          <hr className="mr-1 bg-yale-blue h-5 w-1" />
          <h2>ESTATÍSTICA DE ACIDENTES POR <strong>TIPOS- DE PISTAS</strong></h2>
        </div>

        <Filters
          inputSelect={
            <>
              <InputSelect
                data={menuData}
                selectLabel={"Métrica"}
                // onChange={handleMetricChange}
                onChange={(e) => setMetric(e.target.value)}
                value={metric}
              />
              <InputSelect
                data={yearData}
                selectLabel={"Ano"}
                // onChange={handleYearChange}
                onChange={(e) => setYear(e.target.value)}
                value={year}
              />
            </>
          }

        />
      </div>

      <div className="relative w-4/5" >
        {isHighwayError || isGuardrailError || isMedianError || isShoulderError ? (
          <p>Ocorreu um erro ao carregar os dados.</p>
        ) : metric === "Envolvidos" ? (
          <GraphPieBar
            highwayData={highwayMetricData}
            guardrailData={guardrailMetricData}
            medianData={medianMetricData}
            shoulderData={shoulderMetricData}
            speedData={speedMetricData}
            dataYear={year}
          />
        ) : (
          <GraphBarLine
            highwayData={highwayMetricData}
            guardrailData={guardrailMetricData}
            medianData={medianMetricData}
            shoulderData={shoulderMetricData}
            speedData={speedMetricData}
            dataYear={year}
          />
        )}

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

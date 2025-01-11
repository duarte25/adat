"use client";

import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchApi } from "../../utils/fetchApi";
import Filters from "../../component/Filters";
import Styles from "./styles.module.css";
import InputSelect from "../../component/InputSelect";
import GraphPieBar from "@/component/graphHighway/graphPieBar";
import GraphBarLine from "@/component/graphHighway/graphBarLine";

const highwayFullName = {
  "asphalt": "Asfalto",
  "concrete": "Concreto",
  "earth": "Terra",
  "gravel": "Cascalho",
  "not_informed": "Não informado",
  "paving_stone": "Paralelepípedo",
  "unknown": "Desconhecido",
  "yes": "Sim",
  "not": "Não"
};

export default function Road() {
  const [metric, setMetric] = useState("Acidentes");
  const [year, setYear] = useState("2022");
  const [selectedMetric, setSelectedMetric] = useState("Acidentes");
  const [selectedYear, setSelectedYear] = useState("2022");

  const { data: highwayData, isLoading: isHighwayLoading, isError: isHighwayError, refetch: refetchHighway } = useQuery({
    queryKey: ["highwayGetInformacoes", selectedYear],
    queryFn: async () => {
      const response = await fetchApi(`/highway?data=data_highway_${selectedYear}`, "GET");
      return response;
    },
    enabled: true
  });

  const { data: guardrailData, isLoading: isGuardrailLoading, isError: isGuardrailError, refetch: refetchGuardrail } = useQuery({
    queryKey: ["guardrailGetInformacoes", selectedYear],
    queryFn: async () => {
      const response = await fetchApi(`/guardrail?data=data_guardrail_${selectedYear}`, "GET");
      return response;
    },
    enabled: true
  });

  const { data: medianData, isLoading: isMedianLoading, isError: isMedianError, refetch: refetchMedian } = useQuery({
    queryKey: ["medianGetInformacoes", selectedYear],
    queryFn: async () => {
      const response = await fetchApi(`/median?data=data_median_${selectedYear}`, "GET");
      return response;
    },
    enabled: true
  });

  const { data: shoulderData, isLoading: isShoulderLoading, isError: isShoulderError, refetch: refetchShoulder } = useQuery({
    queryKey: ["shoulderGetInformacoes", selectedYear],
    queryFn: async () => {
      const response = await fetchApi(`/shoulder?data=data_shoulder_${selectedYear}`, "GET");
      return response;
    },
    enabled: true
  });

  const { data: speedData, isLoading: isSpeedLoading, isError: isSpeedError, refetch: refetchSpeed } = useQuery({
    queryKey: ["SpeedGetInformacoes", selectedYear],
    queryFn: async () => {
      const response = await fetchApi(`/speed?data=data_speed_${selectedYear}`, "GET");
      return response;
    },
    enabled: true
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
    refetchHighway();
    refetchGuardrail();
    refetchMedian();
    refetchShoulder();
    refetchSpeed();
  };

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

  const highwayMetricData = getMetricData(selectedMetric, highwayData);
  const guardrailMetricData = getMetricData(selectedMetric, guardrailData);
  const medianMetricData = getMetricData(selectedMetric, medianData);
  const shoulderMetricData = getMetricData(selectedMetric, shoulderData);
  const speedMetricData = getMetricData(selectedMetric, speedData);

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

  return (
    <div className={Styles.container}>
      <div className={Styles.filterData}>
        <div className={Styles.title}>
          <hr className={Styles.hrTitle} />
          <h2>ESTATÍSTICA DE ACIDENTES POR <strong>TIPOS- DE PISTAS</strong></h2>
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
        {isHighwayLoading || isGuardrailLoading || isMedianLoading || isShoulderLoading ? (
          <p>Carregando dados...</p>
        ) : isHighwayError || isGuardrailError || isMedianError || isShoulderError ? (
          <p>Ocorreu um erro ao carregar os dados.</p>
        ) : selectedMetric === "Envolvidos" ? (
          <GraphPieBar
            highwayData={highwayMetricData}
            guardrailData={guardrailMetricData}
            medianData={medianMetricData}
            shoulderData={shoulderMetricData}
            speedData={speedMetricData}
            dataYear={selectedYear} 
          />
        ) : (
          <GraphBarLine
            highwayData={highwayMetricData}
            guardrailData={guardrailMetricData}
            medianData={medianMetricData}
            shoulderData={shoulderMetricData}
            speedData={speedMetricData}
            dataYear={selectedYear}
          />
        )}
      </div>
    </div>
  );
}

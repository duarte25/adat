"use client";

import InputSelect from "@/component/InputSelect";
import { SpinnerCircular } from "spinners-react";
import { useState, useEffect } from "react";
import { fetchApi } from "@/utils/fetchApi";
import Filters from "@/component/Filters";
import Chart from "react-google-charts";

export default function EstatisticaAnual() {
  const [selectedInformation, setSelectedInformation] = useState("susp_alcohol?data=data_susp_alcohol_");
  const [dataByYear, setDataByYear] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
   
  const informationData = [
    { value: "susp_alcohol?data=data_susp_alcohol_", label: "Suspeita de álcool" },
    { value: "highway?data=data_highway_", label: "Tipo de pista" },
    { value: "climate?data=data_climate_", label: "Clima" },
    { value: "uf?data=data_uf_", label: "Unidade federativa" },
  ];

  const fetchData = async (infoType) => {
    setIsLoading(true); // Ativa o estado de carregamento

    const years = ["2018", "2019", "2020", "2021", "2022"];
    try {
      const promises = years.map(async (year) => {
        const response = await fetchApi(`/${infoType}${year}`, "GET");
        return { year, data: response };
      });

      const results = await Promise.all(promises);
      setDataByYear(results); // Atualiza os dados
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  // Busca inicial apenas na primeira renderização
  useEffect(() => {
    fetchData(selectedInformation);
  }, [selectedInformation]); // Adicionei selectedInformation como dependência

  // Busca apenas quando o botão for pressionado
  const handleFetchData = () => {
    fetchData(selectedInformation);
  };

  const prepareChartData = () => {
    const chartData = [["Ano", "Total de Acidentes", "Total de Mortes", "Total de Envolvidos", "Total de Feridos"]];

    if (!isLoading && dataByYear.length === 0) {
      // Retorna dados padrão se não houver nenhum dado
      ["2018", "2019", "2020", "2021", "2022"].forEach(year => {
        chartData.push([year, 0, 0, 0, 0]);
      });
    } else {
      dataByYear.forEach(({ year, data }) => {
        let totalAccidents = 0;
        let totalDeaths = 0;
        let totalInvolved = 0;
        let totalInjured = 0;

        Object.values(data).forEach((entry) => {
          totalAccidents += entry.total_accident || 0;
          totalDeaths += entry.total_death || 0;
          totalInvolved += entry.total_involved || 0;
          totalInjured += entry.total_injured || 0;
        });

        chartData.push([year, totalAccidents, totalDeaths, totalInvolved, totalInjured]);
      });
    }

    return chartData;
  };

  const chartData = prepareChartData();

  const options = {
    title: "Totais de Acidentes por Ano",
    hAxis: { title: "Ano" },
    vAxis: { title: "Totais" },
    legend: { position: "bottom" },
    colors: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a"],
    pointSize: 6,
    series: {
      0: {
        pointShape: 'circle',
        pointSize: 8,
      }
    }
  };

  return (
    <div className="flex flex-col items-center pt-5 gap-5">
      <div className="w-1/2">
        <div className="flex flex-row mb-1">
          <hr className="mr-1 bg-yale-blue h-5 w-1" />
          <h2>ESTATÍSTICA DE ACIDENTES POR <strong>ESTATÍSTICA ANUAL</strong></h2>
        </div>
        <Filters
          inputSelect={
            <InputSelect
              data={informationData}
              selectLabel={"Informação"}
              onChange={(e) => setSelectedInformation(e.target.value)}
              value={selectedInformation}
            />
          }
          onButtonClick={handleFetchData} // Apenas ao clicar no botão
        />
      </div>
      <div className="w-4/5 relative">
        {/* Sempre mostra o gráfico (com dados antigos ou vazios) */}
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={chartData}
          options={options}
        />

        {/* Mostra o spinner por cima enquanto carrega */}
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-60 z-10">
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
"use client";

import Filters from "@/component/Filters";
import InputSelect from "@/component/InputSelect";
import { fetchApi } from "@/utils/fetchApi";
import { useState } from "react";
import Chart from "react-google-charts";

export default function EstatisticaAnual() {
    const [selectedInformation, setSelectedInformation] = useState("");
    const [dataByYear, setDataByYear] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const informationData = [
        { value: "susp_alcohol?data=data_susp_alcohol_", label: "Suspeita de álcool" },
        { value: "highway?data=data_highway_", label: "Tipo de pista" },
        { value: "climate?data=data_climate_", label: "Clima" },
        { value: "uf?data=data_uf_", label: "Unidade federativa" },
    ];

    const handleFetchData = async () => {
        setIsLoading(true);
        setError(null);

        const years = ["2018", "2019", "2020", "2021", "2022"];
        try {
            // Faz todas as requisições para os anos mencionados
            const promises = years.map(async (year) => {
                const response = await fetchApi(`/${selectedInformation}${year}`, "GET");
                return { year, data: response };
            });

            const results = await Promise.all(promises);
            setDataByYear(results); // Armazena os dados para exibir na interface
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const prepareChartData = () => {
        const chartData = [["Ano", "Total de Acidentes", "Total de Mortes", "Total de Envolvidos", "Total de Feridos"]];

        // Itera sobre os anos e soma os valores
        dataByYear.forEach(({ year, data }) => {
            let totalAccidents = 0;
            let totalDeaths = 0;
            let totalInvolved = 0;
            let totalInjured = 0;

            // Itera sobre os atributos dinâmicos dentro de cada ano
            Object.values(data).forEach((entry) => {
                totalAccidents += entry.total_accident || 0;
                totalDeaths += entry.total_death || 0;
                totalInvolved += entry.total_involved || 0;
                totalInjured += entry.total_injured || 0;
            });

            // Adiciona os totais à linha do gráfico
            chartData.push([year, totalAccidents, totalDeaths, totalInvolved, totalInjured]);
        });

        return chartData;
    };

    const chartData = prepareChartData();

    const options = {
        title: "Totais de Acidentes por Ano",
        hAxis: { title: "Ano" },
        vAxis: { title: "Totais" },
        legend: { position: "bottom" },
      };

    return (
        <div>
            <Filters
                inputSelect={
                    <>
                        <InputSelect
                            data={informationData}
                            selectLabel={"Informação"}
                            onChange={(e) => setSelectedInformation(e.target.value)}
                            value={selectedInformation}
                        />
                    </>
                }
                onButtonClick={handleFetchData}
            />
            {isLoading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p>Erro ao carregar os dados: {error.message}</p>
            ) : (
                <div>
                    <Chart chartType="LineChart" width="100%" height="400px" data={chartData} options={options} />
                </div>
            )}
        </div>
    );
}

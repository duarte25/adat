"use client";

import Filters from "@/component/Filters";
import InputSelect from "@/component/InputSelect";
import { fetchApi } from "@/utils/fetchApi";
import { useState, useEffect } from "react";
import Chart from "react-google-charts";

export default function EstatisticaAnual() {
    const [selectedInformation, setSelectedInformation] = useState("susp_alcohol?data=data_susp_alcohol_");
    const [dataByYear, setDataByYear] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const informationData = [
        { value: "susp_alcohol?data=data_susp_alcohol_", label: "Suspeita de álcool" },
        { value: "highway?data=data_highway_", label: "Tipo de pista" },
        { value: "climate?data=data_climate_", label: "Clima" },
        { value: "uf?data=data_uf_", label: "Unidade federativa" },
    ];

    const fetchData = async (infoType) => {
        setIsLoading(true);
        setError(null);

        const years = ["2018", "2019", "2020", "2021", "2022"];
        try {
            const promises = years.map(async (year) => {
                const response = await fetchApi(`/${infoType}${year}`, "GET");
                return { year, data: response };
            });

            const results = await Promise.all(promises);
            setDataByYear(results);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Busca inicial apenas na primeira renderização
    useEffect(() => {
        fetchData(selectedInformation);
    }, []); // Executa apenas uma vez ao montar o componente

    // Busca apenas quando o botão for pressionado
    const handleFetchData = () => {
        fetchData(selectedInformation);
    };

    const prepareChartData = () => {
        const chartData = [["Ano", "Total de Acidentes", "Total de Mortes", "Total de Envolvidos", "Total de Feridos"]];

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
            <div className="w-4/5">
                <Chart chartType="LineChart" width="100%" height="400px" data={chartData} options={options} />
            </div>
        </div>
    );
}

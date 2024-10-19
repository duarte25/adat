import React from "react";
import Chart from "react-google-charts";
import Styles from "./graphPie.module.css";

export default function GraphPie({ highwayData, shoulderData, medianData, guardrailData }) {
    // Função para extrair os dados de um tipo de pista específico
    const getHighwayData = (data, highwayType) => {
        return data.find((item) => item.highway === highwayType)?.data || [];
    };

    // Função para extrair os valores numéricos de um tipo de métrica específica (ex: shoulder, median)
    const getMetricData = (data, metricType) => {
        return data.find((item) => item.highway === metricType)?.data.map(d => d[1]) || [];
    };

    // Configura os dados para o gráfico de barras
    const prepareBarChartData = (metricData) => [
        ['Tipo de Estrada', 'Óbitos', 'Envolvidos', 'Feridos'],
        ['Não', metricData.nao[0] || 0, metricData.nao[1] || 0, metricData.nao[2] || 0],
        ['Não informado', metricData.naoInformado[0] || 0, metricData.naoInformado[1] || 0, metricData.naoInformado[2] || 0],
        ['Desconhecido', metricData.desconhecido[0] || 0, metricData.desconhecido[1] || 0, metricData.desconhecido[2] || 0],
        ['Sim', metricData.sim[0] || 0, metricData.sim[1] || 0, metricData.sim[2] || 0]
    ];

    // Estrutura os dados de acostamento e mediana
    const shoulderMetricData = {
        nao: getMetricData(shoulderData, 'Não'),
        naoInformado: getMetricData(shoulderData, 'Não informado'),
        desconhecido: getMetricData(shoulderData, 'Desconhecido'),
        sim: getMetricData(shoulderData, 'Sim'),
    };

    const medianMetricData = {
        nao: getMetricData(medianData, 'Não'),
        naoInformado: getMetricData(medianData, 'Não informado'),
        desconhecido: getMetricData(medianData, 'Desconhecido'),
        sim: getMetricData(medianData, 'Sim'),
    };

    const guardrailMetricData = {
        nao: getMetricData(guardrailData, 'Não'),
        naoInformado: getMetricData(guardrailData, 'Não informado'),
        desconhecido: getMetricData(guardrailData, 'Desconhecido'),
        sim: getMetricData(guardrailData, 'Sim'),
    };

    // Dados dos gráficos de barras
    const chartDataShoulder = prepareBarChartData(shoulderMetricData);
    const chartDataMedian = prepareBarChartData(medianMetricData);
    const chartDataGuardrail = prepareBarChartData(guardrailMetricData);

    // Opções para PieChart e BarChart
    const pieOptions = {
        pieHole: 0.4,
        colors: ["#5992d0", "#083D77", "#0552B5"],
        legend: { position: "right" },
        titleTextStyle: {
            fontSize: 24,
            bold: true,
        },
    };

    const barOptions = {
        chartArea: { width: '70%', height: '70%' },
        colors: ["#5992d0", "#083D77", "#0552B5"],
        axes: {
            y: {
                1: { side: 'left' }
            }
        },
    };

    // Mapeamento dos tipos de estradas para renderização dinâmica dos gráficos
    const highwayTypes = [
        { type: "Asfalto", data: getHighwayData(highwayData, "Asfalto") },
        { type: "Concreto", data: getHighwayData(highwayData, "Concreto") },
        { type: "Terra", data: getHighwayData(highwayData, "Terra") },
        { type: "Paralelepípedo", data: getHighwayData(highwayData, "Paralelepípedo") },
        { type: "Cascalho", data: getHighwayData(highwayData, "Cascalho") },
        { type: "Desconhecido", data: getHighwayData(highwayData, "Desconhecido") },
        { type: "Não informado", data: getHighwayData(highwayData, "Não informado") },
    ];

    // Dividir os gráficos em grupos de 2
    const groupedHighwayTypes = [];
    for (let i = 0; i < highwayTypes.length; i += 2) {
        groupedHighwayTypes.push(highwayTypes.slice(i, i + 2));
    }

    return (
        <div className={Styles.container}>
            {groupedHighwayTypes.map((group, index) => (
                <div key={index} className={Styles.containerRow}>
                    {group.map((highway) => (
                        <div key={highway.type} className={Styles.graph}>
                            <Chart
                                chartType="PieChart"
                                data={highway.data}
                                options={{ ...pieOptions, title: highway.type }}
                                width="100%"
                                height="50vh"
                            />
                        </div>
                    ))}
                </div>
            ))}

            <hr className={Styles.bar} />

            <div className={Styles.containerRow}>
                <div className={Styles.graph}>
                    <h3>Acostamento</h3>
                    <Chart
                        chartType="Bar"
                        data={chartDataShoulder}
                        options={{ ...barOptions }}
                        width="100%"
                        height="40vh"
                    />
                </div>

                <div className={Styles.graph}>
                    <h3>Canteiro Central</h3>
                    <Chart
                        chartType="Bar"
                        data={chartDataMedian}
                        options={{ ...barOptions }}
                        width="100%"
                        height="40vh"
                    />
                </div>
            </div>

            <div className={Styles.containerRow}>
                <div className={Styles.graph}>
                    <h3>Guarda Costa</h3>
                    <Chart
                        chartType="Bar"
                        data={chartDataGuardrail}
                        options={{ ...barOptions }}
                        width="100%"
                        height="40vh"
                    />
                </div>

                <div className={Styles.graph}>
                    <h3>Mediana</h3>
                    <Chart
                        chartType="Bar"
                        data={chartDataMedian}
                        options={{ ...barOptions }}
                        width="100%"
                        height="40vh"
                    />
                </div>
            </div>
        </div>
    );
}

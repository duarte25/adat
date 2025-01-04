import React from "react";
import Chart from "react-google-charts";
import Styles from "./graphPieBar.module.css";

export default function GraphPieBar({ highwayData, shoulderData, medianData, guardrailData, speedData, dataYear }) {

    const getHighwayData = (data, highwayType) => {
        const highwayData = data.find((item) => item.highway === highwayType)?.data || [];
        return highwayData.map(([label, value]) => [
            `${label}: ${value.toLocaleString('pt-BR')}`, // Formata o valor para o formato brasileiro (ex: 1.200)
            value
        ]);
    };
    
    // Função para extrair os valores numéricos de um tipo de métrica específica (ex: shoulder, median)
    const getMetricData = (data, metricType) => {
        return data.find((item) => item.highway === metricType)?.data.map(d => d[1]) || [];
    };

    // Configura os dados para o gráfico de barras
    const prepareBarChartData = (metricData) => [
        [`${dataYear}`, 'Óbitos', 'Envolvidos', 'Feridos'],
        ['Não', metricData.nao[0] || 0, metricData.nao[1] || 0, metricData.nao[2] || 0],
        ['Não informado', metricData.naoInformado[0] || 0, metricData.naoInformado[1] || 0, metricData.naoInformado[2] || 0],
        ['Desconhecido', metricData.desconhecido[0] || 0, metricData.desconhecido[1] || 0, metricData.desconhecido[2] || 0],
        ['Sim', metricData.sim[0] || 0, metricData.sim[1] || 0, metricData.sim[2] || 0]
    ];

    const prepareBarChartDataSpeed = (metricData) => [
        [`${dataYear}`, 'Óbitos', 'Envolvidos', 'Feridos'],
        ['110 km/h', metricData.quilometro110[0] || 0, metricData.quilometro110[1] || 0, metricData.quilometro110[2] || 0],
        ['30 km/h', metricData.quilometro30[0] || 0, metricData.quilometro30[1] || 0, metricData.quilometro30[2] || 0],
        ['40 km/h', metricData.quilometro40[0] || 0, metricData.quilometro40[1] || 0, metricData.quilometro40[2] || 0],
        ['60 km/h', metricData.quilometro60[0] || 0, metricData.quilometro60[1] || 0, metricData.quilometro60[2] || 0],
        ['80 km/h', metricData.quilometro80[0] || 0, metricData.quilometro80[1] || 0, metricData.quilometro80[2] || 0],
        ['Não informado', metricData.naoInformado[0] || 0, metricData.naoInformado[1] || 0, metricData.naoInformado[2] || 0]
    ];

    // Estrutura os dados de acostamento, mediana, guarda-corpo e velocidade
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

    const speedMetricData = {
        quilometro110: getMetricData(speedData, '110_kmh'),
        quilometro30: getMetricData(speedData, '30_kmh'),
        quilometro40: getMetricData(speedData, '40_kmh'),
        quilometro60: getMetricData(speedData, '60_kmh'),
        quilometro80: getMetricData(speedData, '80_kmh'),
        naoInformado: getMetricData(speedData, 'Não informado')
    };

    // Dados dos gráficos de barras
    const chartDataShoulder = prepareBarChartData(shoulderMetricData);
    const chartDataMedian = prepareBarChartData(medianMetricData);
    const chartDataGuardrail = prepareBarChartData(guardrailMetricData);
    const chartDataSpeed = prepareBarChartDataSpeed(speedMetricData);

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
                    <h3>Velocidade máxima da via</h3>
                    <Chart
                        chartType="Bar"
                        data={chartDataSpeed}
                        options={{ ...barOptions }}
                        width="100%"
                        height="40vh"
                    />
                </div>
            </div>
        </div>
    );
}

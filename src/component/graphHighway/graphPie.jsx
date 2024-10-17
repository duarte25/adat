import React from "react";
import Chart from "react-google-charts";
import Styles from "./graphPie.module.css"; // Certifique-se de que o estilo seja importado corretamente
import { styleText } from "util";

export default function GraphPie({ highwayData, shoulderData }) {

    // Extraímos cada tipo de pista diretamente dos dados
    const asphaltData = highwayData.find((item) => item.highway === "Asfalto")?.data || [];
    const concreteData = highwayData.find((item) => item.highway === "Concreto")?.data || [];
    const earthData = highwayData.find((item) => item.highway === "Terra")?.data || [];
    const gravelData = highwayData.find((item) => item.highway === "Cascalho")?.data || [];
    const notInformedData = highwayData.find((item) => item.highway === "Não informado")?.data || [];
    const pavingStoneData = highwayData.find((item) => item.highway === "Paralelepípedo")?.data || [];
    const unknownData = highwayData.find((item) => item.highway === "Desconhecido")?.data || [];

    // Extrai os valores numéricos dos dados, garantindo que sejam números
    const naoData = shoulderData.find((item) => item.highway === 'Não')?.data.map(d => d[1]) || [];
    const naoInformadoData = shoulderData.find((item) => item.highway === 'Não informado')?.data.map(d => d[1]) || [];
    const desconhecidoData = shoulderData.find((item) => item.highway === 'Desconhecido')?.data.map(d => d[1]) || [];
    const simData = shoulderData.find((item) => item.highway === 'Sim')?.data.map(d => d[1]) || [];

    // Configura os dados para o gráfico de barras
    const chartDataShoulder = [
        ['Tipo de Estrada', 'Óbitos', 'Envolvidos', 'Feridos'],
        ['Não', naoData[0] || 0, naoData[1] || 0, naoData[2] || 0],
        ['Não informado', naoInformadoData[0] || 0, naoInformadoData[1] || 0, naoInformadoData[2] || 0],
        ['Desconhecido', desconhecidoData[0] || 0, desconhecidoData[1] || 0, desconhecidoData[2] || 0],
        ['Sim', simData[0] || 0, simData[1] || 0, simData[2] || 0]
    ];

    // Opções para PieChart
    const pieOptions = {
        pieHole: 0.4,
        colors: ["#5992d0", "#083D77", "#0552B5"],
        legend: { position: "right" },
        titleTextStyle: {
            fontSize: 24,
            bold: true,
        },
    };

    // Opções para BarChart
    const barOptions = {

        chartArea: { width: '70%', height: '70%' },
        colors: ["#5992d0", "#083D77", "#0552B5"],
        // legend: { position: 'left' },
        axes: {
            y: {
                1: { side: 'left' }
            }
        },
        
        
    };

    return (
        <div className={Styles.container}>
            <div className={Styles.containerRow}>
                <div className={Styles.graph}>
                    <Chart
                        chartType="PieChart"
                        data={asphaltData}
                        options={{ ...pieOptions, title: "Asfalto" }}
                        width="100%"
                        height="50vh"
                    />
                </div>

                <div className={Styles.graph}>
                    <Chart
                        chartType="PieChart"
                        data={concreteData}
                        options={{ ...pieOptions, title: "Concreto" }}
                        width="100%"
                        height="50vh"
                    />
                </div>
            </div>

            <div className={Styles.containerRow}>
                <div className={Styles.graph}>
                    <Chart
                        chartType="PieChart"
                        data={earthData}
                        options={{ ...pieOptions, title: "Terra" }}
                        width="100%"
                        height="50vh"
                    />
                </div>

                <div className={Styles.graph}>
                    <Chart
                        chartType="PieChart"
                        data={pavingStoneData}
                        options={{ ...pieOptions, title: "Paralelepípedo" }}
                        width="100%"
                        height="50vh"
                    />
                </div>
            </div>

            <div className={Styles.containerRow}>
                <div className={Styles.graph}>
                    <Chart
                        chartType="PieChart"
                        data={gravelData}
                        options={{ ...pieOptions, title: "Cascalho" }}
                        width="100%"
                        height="50vh"
                    />
                </div>

                <div className={Styles.graph}>
                    <Chart
                        chartType="PieChart"
                        data={unknownData}
                        options={{ ...pieOptions, title: "Desconhecido" }}
                        width="100%"
                        height="50vh"
                    />
                </div>
            </div>

            <div className={Styles.containerRow}>
                <div className={Styles.graph}>
                    <Chart
                        chartType="PieChart"
                        data={notInformedData}
                        options={{ ...pieOptions, title: "Não informado" }}
                        width="100%"
                        height="50vh"
                    />
                </div>
            </div>

            <hr className={Styles.bar} />

            <div className={Styles.containerRow}>
                <div className={Styles.graph}>
                    <h3>Acostamento</h3>
                    <Chart
                        chartType="Bar"
                        data={chartDataShoulder}
                        options={{
                            ...barOptions
                        }}
                        width="100%"
                        height="40vh"
                    />
                </div>
            </div>
        </div>
    );
}

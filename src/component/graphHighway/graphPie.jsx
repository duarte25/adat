import React from "react";
import Chart from "react-google-charts";
import Styles from "./graphPie.module.css"; // Certifique-se de que o estilo seja importado corretamente

export default function GraphPie({ dataPie }) {

    // Extraímos cada tipo de pista diretamente dos dados
    const asphaltData = dataPie.find((item) => item.highway === "Asfalto")?.data || [];
    const concreteData = dataPie.find((item) => item.highway === "Concreto")?.data || [];
    const earthData = dataPie.find((item) => item.highway === "Terra")?.data || [];
    const gravelData = dataPie.find((item) => item.highway === "Cascalho")?.data || [];
    const notInformedData = dataPie.find((item) => item.highway === "Não informado")?.data || [];
    const pavingStoneData = dataPie.find((item) => item.highway === "Paralelepípedo")?.data || [];
    const unknownData = dataPie.find((item) => item.highway === "Desconhecido")?.data || [];

    const options = {
        pieHole: 0.4,
        colors: ["#5992d0", "#083D77", "#0552B5"], // Defina suas cores aqui
        legend: { position: "right" },
        titleTextStyle: { // Estiliza o título
            fontSize: 24, // Tamanho da fonte
            bold: true, // Negrito
        },
    };

    return (
        <div className={Styles.container}>
            <div className={Styles.containerRow}>
                <div className={Styles.graph}>
                    <Chart
                        chartType="PieChart"
                        data={asphaltData}
                        options={{ ...options, title: "Asfalto" }}
                        width="100%"
                        height="50vh"
                    />
                </div>

                <div className={Styles.graph}>
                    <Chart
                        chartType="PieChart"
                        data={concreteData}
                        options={{ ...options, title: "Concreto" }}
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
                        options={{ ...options, title: "Terra" }}
                        width="100%"
                        height="50vh"
                    />
                </div>

                <div className={Styles.graph}>
                    <Chart
                        chartType="PieChart"
                        data={pavingStoneData}
                        options={{ ...options, title: "Paralelepípedo" }}
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
                        options={{ ...options, title: "Cascalho" }}
                        width="100%"
                        height="50vh"
                    />
                </div>

                <div className={Styles.graph}>
                    <Chart
                        chartType="PieChart"
                        data={unknownData}
                        options={{ ...options, title: "Desconhecido" }}
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
                        options={{ ...options, title: "Não informado" }}
                        width="100%"
                        height="50vh"
                    />
                </div>
            </div>

            <hr className={Styles.bar} />

            <div className={Styles.containerRow}>
                <div className={Styles.graph}>
                    <Chart
                        chartType="Bar"
                        data={unknownData}
                        options={{ ...options, title: "Desconhecido" }}
                        width="100%"
                        height="50vh"
                    />
                </div>

                <div className={Styles.graph}>
                    <Chart
                        chartType="Bar"
                        data={notInformedData}
                        options={{ ...options, title: "Não informado" }}
                        width="100%"
                        height="50vh"
                    />
                </div>
            </div>
        </div>

    );
}

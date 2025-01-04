import Styles from './graphPieBar.module.css';
import Chart from 'react-google-charts';
import React from 'react';

export default function GraphBarLine({ highwayData, guardrailData, medianData, shoulderData, speedData, dataYear }) {

    // Transformar os dados para o formato esperado pelo gráfico
    const highwayMetricData = [
        ['Rodovia', 'Acidentes', 'Média de Acidentes '], // Cabeçalhos
        ...highwayData.map(row => {
            const highway = row.highway; // Nome da rodovia
            const accidents = row.data[1][1]; // Acessa o número de acidentes
            return [highway, accidents, accidents]; // Retorna um array com o nome da rodovia, número de acidentes e a média
        }),
    ];

    const guardrailMetricData = [
        ['Metrica', 'Acidentes', 'Média de Acidentes'],
        ...guardrailData.map(row => {
            const metric = row.highway;
            const accidents = row.data[1][1];
            return [metric, accidents, accidents];
        }),
    ];

    const medianMetricData = [
        ['Metrica', 'Acidentes', 'Média de Acidentes'],
        ...medianData.map(row => {
            const metric = row.highway;
            const accidents = row.data[1][1];
            return [metric, accidents, accidents];
        }),
    ];

    const shoulderMetricData = [
        ['Metrica', 'Acidentes', 'Média de Acidentes'],
        ...shoulderData.map(row => {
            const metric = row.highway;
            const accidents = row.data[1][1];
            return [metric, accidents, accidents];
        }),
    ];

    const speedMedianData = [
        ['Metrica', 'Acidentes', 'Média de Acidentes'],
        ...speedData.map(row => {
            const metric = row.highway;
            const accidents = row.data[1][1];
            return [metric, accidents, accidents];
        }),
    ];

    function sortDataByColumn(data, sortIndex) {
        if (data.length <= 1) return data; // Retorna diretamente se não houver dados para ordenar
        const [header, ...rows] = data; // Separa o cabeçalho das linhas
        const sortedRows = [...rows].sort((a, b) => b[sortIndex] - a[sortIndex]); // Ordena as linhas
        return [header, ...sortedRows]; // Recombina o cabeçalho com as linhas ordenadas
    }
    
    const chartDataHighway = sortDataByColumn(highwayMetricData, 1);

    const chartDataGuardrail = sortDataByColumn(guardrailMetricData, 1);

    const chartDataMedian = sortDataByColumn(medianMetricData, 1);

    const chartDataShoulder = sortDataByColumn(shoulderMetricData, 1);

    const speedDataMedian = sortDataByColumn(speedMedianData, 1);

    // Configurações do gráfico
    const options = {
        title: 'Acidentes por Rodovia',
        vAxis: { title: 'Quantidade de Acidentes ' },
        hAxis: { title: 'Rodovia' },
        seriesType: 'bars', // Tipo padrão como barras
        series: {
            // Ou line mas acho que vou preferir area e colocar um z-index para ficar sobreposto
            1: { type: 'area', color: 'blue', lineWidth: 2, pointSize: 5 }, // Define a série da linha
        },
        colors: ['#e7b5b5', 'blue'], // Cor das barras e da linha
        legend: { position: 'top' }, // Posiciona a legenda no topo
        interpolateNulls: true, // Para evitar buracos na linha
    };

    return (
        <>
            <div className={Styles.containerRow}>
                <div className={Styles.graph}>
                    <Chart
                        chartType="ComboChart"
                        width="100%"
                        height="40vh"
                        data={chartDataHighway}
                        options={options}
                    />
                </div>
                <div className={Styles.graph}>
                    <Chart
                        chartType="ComboChart"
                        width="100%"
                        height="40vh"
                        data={chartDataGuardrail}
                        options={options}
                    />
                </div>

            </div>

            <div className={Styles.containerRow}>
                <div className={Styles.graph}>
                    <Chart
                        chartType="ComboChart"
                        width="100%"
                        height="40vh"
                        data={chartDataMedian}
                        options={options}
                    />
                </div>
                <div className={Styles.graph}>
                    <Chart
                        chartType="ComboChart"
                        width="100%"
                        height="40vh"
                        data={chartDataShoulder}
                        options={options}
                    />
                </div>

            </div>

            <div className={Styles.containerRow}>
                <div className={Styles.graph}>
                    <Chart
                        chartType="ComboChart"
                        width="100%"
                        height="40vh"
                        data={speedDataMedian}
                        options={options}
                    />
                </div>
            </div>
        </>
    );
}

import React from 'react';
import Chart from 'react-google-charts';
import Styles from './graphPieBar.module.css';

export default function GraphBarLine({ highwayData, guardrailData, medianData, shoulderData, speedData, dataYear}) {
    // Função para transformar e ordenar os dados
    const transformAndSortData = (data, headers) => {
        const transformedData = [
            headers,
            ...data.map(row => {
                const label = row.highway; // Nome ou métrica
                const accidents = row.data[1][1]; // Número de acidentes
                return [label, accidents, accidents];
            }),
        ];
        // Ordenar do maior para o menor número de acidentes
        const sortedData = transformedData.slice(1).sort((a, b) => b[1] - a[1]);
        return [headers, ...sortedData];
    };

    // Transformação e ordenação dos conjuntos de dados
    const headers = ['Categoria', 'Acidentes', 'Média de Acidentes'];
    const finalDataHighway = transformAndSortData(highwayData, headers);
    const finalDataGuardrail = transformAndSortData(guardrailData, headers);
    const finalDataMedian = transformAndSortData(medianData, headers);
    const finalDataShoulder = transformAndSortData(shoulderData, headers);
    const finalDataSpeed = transformAndSortData(speedData, headers);

    // Configurações do gráfico
    const options = {
        vAxis: { title: 'Quantidade de Acidentes' },
        hAxis: { title: dataYear },
        seriesType: 'bars', // Tipo padrão: barras
        series: {
            1: { type: 'area', color: 'blue', lineWidth: 2, pointSize: 5 }, // Série: linha/área
        },
        colors: ['#e7b5b5', 'blue'], // Cor das barras e da linha
        legend: { position: 'top' }, // Legenda no topo
        interpolateNulls: true, // Evitar buracos na linha
    };

    return (
        <div>
            <div className={Styles.containerRow}>
                <Chart
                    chartType="ComboChart"
                    width="800px"
                    height="500px"
                    data={finalDataHighway}
                    options={{ ...options, title: "Acidentes por tipo de estrada" }}
                />
                <Chart
                    chartType="ComboChart"
                    width="800px"
                    height="500px"
                    data={finalDataGuardrail}
                    options={{ ...options, title: "Havia Guardrail (guarda-corpo)" }}
                />
            </div>

            <div className={Styles.containerRow}>
                <Chart
                    chartType="ComboChart"
                    width="800px"
                    height="500px"
                    data={finalDataMedian}
                    options={{ ...options, title: "Havia canteido central" }}
                />
                <Chart
                    chartType="ComboChart"
                    width="800px"
                    height="500px"
                    data={finalDataShoulder}
                    options={{ ...options, title: "Havia Acostamento" }}
                />
            </div>

            <div className={Styles.containerRow}>
                <Chart
                    chartType="ComboChart"
                    width="800px"
                    height="500px"
                    data={finalDataSpeed}
                    options={{ ...options, title: "Velocidade da via dos acidentes" }}
                />
    
            </div>
        </div>
    );
}

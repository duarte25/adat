import React from 'react';
import Chart from 'react-google-charts';

export default function GraphBarLine({ highwayData, guardrailData }) {

    // Transformar os dados para o formato esperado pelo gráfico
    const data = [
        ['Rodovia', 'Acidentes', 'Média de Acidentes'], // Cabeçalhos
        ...highwayData.map(row => {
            const highway = row.highway; // Nome da rodovia
            const accidents = row.data[1][1]; // Acessa o número de acidentes

            // Lógica para calcular a média ou outro valor (exemplo fixo)
            // const averageAccidents = (row.data.reduce((sum, r) => sum + r[1], 0) / row.data.length) || 0;

            return [highway, accidents, accidents]; // Retorna um array com o nome da rodovia, número de acidentes e a média
        }),
    ];

    console.log("Highway", data)
    console.log("Guardrail", guardrailData)

    const guardrail = [
        ['Metrica', 'Acidentes', 'Média de Acidentes'],
        ...guardrailData.map(row => {

            const metric = row.highway;
            const accidents = row.data[1][1];

            return [metric, accidents, accidents];
        }),
    ];


    console.log("GUARDRAIL 2", guardrail)

    // Ordenar os dados pelo número de acidentes, do maior para o menor
    const sortedData = data.slice(1).sort((a, b) => b[1] - a[1]); // Ignora o cabeçalho e ordena

    // Concatenar o cabeçalho com os dados ordenados
    const finalData = [data[0], ...sortedData];

    // Configurações do gráfico
    const options = {
        title: 'Acidentes por Rodovia',
        vAxis: { title: 'Quantidade de Acidentes' },
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
            <Chart
                chartType="ComboChart"
                width="800px"
                height="500px"
                data={finalData}
                options={options}
            />

            <Chart
                chartType="ComboChart"
                width="800px"
                height="500px"
                data={finalData}
                options={options}
            />
        </>
    );
}

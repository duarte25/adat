import Chart from "react-google-charts";

export default function GraphBarLine({ highwayData, guardrailData, medianData, shoulderData, speedData }) {

  // Transformar os dados para o formato esperado pelo gráfico
  const highwayMetricData = [
    ['Rodovia', 'Acidentes', 'Média de Acidentes '], // Cabeçalhos
    ...highwayData.map(row => {
      const highway = row.highway; // Nome da rodovia
      const accidents = row.data?.[1]?.[1] ?? 0; // Acessa o número de acidentes
      return [highway, accidents, accidents]; // Retorna um array com o nome da rodovia, número de acidentes e a média
    }),
  ];

  const guardrailMetricData = [
    ['Metrica', 'Acidentes', 'Média de Acidentes'],
    ...guardrailData.map(row => {
      const metric = row.highway;
      const accidents = row.data?.[1]?.[1] ?? 0;
      return [metric, accidents, accidents];
    }),
  ];

  const medianMetricData = [
    ['Metrica', 'Acidentes', 'Média de Acidentes'],
    ...medianData.map(row => {
      const metric = row.highway;
      const accidents = row.data?.[1]?.[1] ?? 0;
      return [metric, accidents, accidents];
    }),
  ];

  const shoulderMetricData = [
    ['Metrica', 'Acidentes', 'Média de Acidentes'],
    ...shoulderData.map(row => {
      const metric = row.highway;
      const accidents = row.data?.[1]?.[1] ?? 0;
      return [metric, accidents, accidents];
    }),
  ];

  const speedMedianData = [
    ['Metrica', 'Acidentes', 'Média de Acidentes'],
    ...speedData.map(row => {
      const metric = row.highway;
      const accidents = row.data?.[1]?.[1] ?? 0;
      return [metric, accidents, accidents];
    }),
  ];

  function sortDataByColumn(data, sortIndex) {
    if (data.length <= 1) return data; // Retorna diretamente se não houver dados para ordenar
    const [header, ...rows] = data; // Separa o cabeçalho das linhas
    const sortedRows = [...rows].sort((a, b) => b[sortIndex] - a[sortIndex]); // Ordena as linhas
    return [header, ...sortedRows]; // Recombina o cabeçalho com as linhas ordenadas
  }

  const getChartData = (data, header) => {
    return data.length > 1 ? data : [...header, ['Sem dados', 0, 0]];
  };

  const chartDataHighway = getChartData(sortDataByColumn(highwayMetricData, 1), [['Rodovia', 'Acidentes', 'Média de Acidentes']]);

  const chartDataGuardrail = getChartData(sortDataByColumn(guardrailMetricData, 1), [['Metrica', 'Acidentes', 'Média de Acidentes']]);

  const chartDataMedian = getChartData(sortDataByColumn(medianMetricData, 1), [['Metrica', 'Acidentes', 'Média de Acidentes']]);

  const chartDataShoulder = getChartData(sortDataByColumn(shoulderMetricData, 1), [['Metrica', 'Acidentes', 'Média de Acidentes']]);

  const chartDataSpeed = getChartData(sortDataByColumn(speedMedianData, 1), [['Metrica', 'Acidentes', 'Média de Acidentes']]);

  // Configurações do gráfico
  const options = {
    title: 'Acidentes por Rodovia',
    vAxis: { title: 'Quantidade de Acidentes ' },
    hAxis: { title: 'Rodovia' },
    seriesType: 'bars', // Tipo padrão como barras
    series: {
      1: { type: 'area', color: 'blue', lineWidth: 2, pointSize: 5 }, // Série: linha/área
    },
    colors: ['#e7b5b5', 'blue'], // Cor das barras e da linha
    legend: { position: 'top' }, // Legenda no topo
    interpolateNulls: true, // Evitar buracos na linha
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-3/6 gap-1 box-border">
          <Chart
            chartType="ComboChart"
            width="100%"
            height="40vh"
            data={chartDataHighway}
            options={options}
          />
        </div>
        <div className="flex flex-col w-3/6 gap-1 box-border">
          <Chart
            chartType="ComboChart"
            width="100%"
            height="40vh"
            data={chartDataGuardrail}
            options={{
              ...options, hAxis: {
                ...options.hAxis,
                title: "Guarda-corpo",
              }
            }}
          />
        </div>

      </div>

      <div className="flex flex-row">
        <div className="flex flex-col w-3/6 gap-1 box-border">
          <Chart
            chartType="ComboChart"
            width="100%"
            height="40vh"
            data={chartDataMedian}
            options={{
              ...options, hAxis: {
                ...options.hAxis,
                title: "Canteiro Central",
              }
            }}
          />
        </div>
        <div className="flex flex-col w-3/6 gap-1 box-border">
          <Chart
            chartType="ComboChart"
            width="100%"
            height="40vh"
            data={chartDataShoulder}
            options={{
              ...options, hAxis: {
                ...options.hAxis,
                title: "Acostamento",
              }
            }}
          />
        </div>

      </div>

      <div className="flex flex-row">
        <div className="flex flex-col w-3/6 gap-1 box-border">
          <Chart
            chartType="ComboChart"
            width="100%"
            height="40vh"
            data={chartDataSpeed}
            options={{
              ...options, hAxis: {
                ...options.hAxis,
                title: "Velocidade",
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

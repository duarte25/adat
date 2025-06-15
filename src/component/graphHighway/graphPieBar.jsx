import Chart from "react-google-charts";

export default function GraphPieBar({ highwayData, shoulderData, medianData, guardrailData, speedData, dataYear }) {

  console.log("SPEED", speedData)

  const getHighwayData = (data, highwayType) => {
    const highwayData = data.find((item) => item.highway === highwayType)?.data || [];

    if (highwayData.length === 0) {
      return [["Sem dados", 0]];
    }

    // Filtrar fora a linha com label "Envolvidos"
    const filteredData = highwayData.filter(([label]) => label !== "Envolvidos");

    // Se ainda assim não houver dados, retornar sem dados
    if (filteredData.length === 0) {
      return [["Sem dados", 0]];
    }

    return filteredData.map(([label, value]) => [
      `${label}: ${value.toLocaleString('pt-BR')}`,
      value
    ]);
  };

  // Função para extrair os valores numéricos de um tipo de métrica específica (ex: shoulder, median)
  const getMetricData = (data, metricType) => {
    return data.find((item) => item.highway === metricType)?.data.map(d => d[1]) || [];
  };

  // Configura os dados para o gráfico de barras
  const prepareBarChartData = (metricData) => [
    [`${dataYear}`, 'Envolvidos', 'Óbitos', 'Feridos'],
    ['Não', metricData.nao[0] || 0, metricData.nao[1] || 0, metricData.nao[2] || 0],
    ['Não informado', metricData.naoInformado[0] || 0, metricData.naoInformado[1] || 0, metricData.naoInformado[2] || 0],
    ['Desconhecido', metricData.desconhecido[0] || 0, metricData.desconhecido[1] || 0, metricData.desconhecido[2] || 0],
    ['Sim', metricData.sim[0] || 0, metricData.sim[1] || 0, metricData.sim[2] || 0]
  ];

  const prepareBarChartDataSpeed = (metricData) => [
    [`${dataYear}`, 'Envolvidos', 'Óbitos', 'Feridos'],
    ['30 km/h', metricData.quilometro30[2] || 0, metricData.quilometro30[1] || 0, metricData.quilometro30[3] || 0],
    ['40 km/h', metricData.quilometro40[2] || 0, metricData.quilometro40[1] || 0, metricData.quilometro40[3] || 0],
    ['60 km/h', metricData.quilometro60[2] || 0, metricData.quilometro60[1] || 0, metricData.quilometro60[3] || 0],
    ['80 km/h', metricData.quilometro80[2] || 0, metricData.quilometro80[1] || 0, metricData.quilometro80[3] || 0],
    ['110 km/h', metricData.quilometro110[2] || 0, metricData.quilometro110[1] || 0, metricData.quilometro110[3] || 0],
    ['Não informado', metricData.naoInformado[2] || 0, metricData.naoInformado[1] || 0, metricData.naoInformado[3] || 0]
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
    quilometro110: getMetricData(speedData, '110 KMH'),
    quilometro30: getMetricData(speedData, '30 KMH'),
    quilometro40: getMetricData(speedData, '40 KMH'),
    quilometro60: getMetricData(speedData, '60 KMH'),
    quilometro80: getMetricData(speedData, '80 MH'),
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
    colors: ["#70eaf5", "#083D77"],
    legend: { position: "right" },
    titleTextStyle: {
      fontSize: 24,
      bold: true,
    },
  };

  const barOptions = {
    chartArea: { width: '70%', height: '70%' },
    colors: ["#70eaf5", "#083D77"],
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
    <div className="flex flex-col gap-5">
      {groupedHighwayTypes.map((group, index) => (
        <div key={index} className="flex flex-row" >
          {group.map((highway) => (
            <div key={highway.type} className="flex flex-col w-3/6 gap-1 box-border" >
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

      <hr className="h-1 w-full bg-beige" />

      <div className="flex flex-row">
        <div className="flex flex-col w-3/6 gap-1 box-border">
          <h3 className="text-2xl font-semibold">Acostamento</h3>
          <Chart
            chartType="Bar"
            data={chartDataShoulder}
            options={{ ...barOptions }}
            width="100%"
            height="40vh"
          />
        </div>

        <div className="flex flex-col w-3/6 gap-1 box-border">
          <h3 className="text-2xl font-semibold">Canteiro Central</h3>
          <Chart
            chartType="Bar"
            data={chartDataMedian}
            options={{ ...barOptions }}
            width="100%"
            height="40vh"
          />
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-col w-3/6 gap-1 box-border">
          <h3 className="text-2xl font-semibold">Guarda Costa</h3>
          <Chart
            chartType="Bar"
            data={chartDataGuardrail}
            options={{ ...barOptions }}
            width="100%"
            height="40vh"
          />
        </div>

        <div className="flex flex-col w-3/6 gap-1 box-border">
          <h3 className="text-2xl font-semibold">Velocidade máxima da via</h3>
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

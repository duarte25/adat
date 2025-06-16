import Chart from "react-google-charts";

export default function GraphBarLine({ highwayData, guardrailData, medianData, shoulderData, speedData }) {

  function sortDataByColumn(data, sortIndex) {
    if (data.length <= 1) return data;
    const [header, ...rows] = data;
    const sortedRows = [...rows].sort((a, b) => b[sortIndex] - a[sortIndex]);
    return [header, ...sortedRows];
  }

  const getChartData = (data) => {
    if (data.length > 1) return data;
    const header = data[0] || ['Métrica', 'Acidentes', { role: 'annotation' }];
    return [header, ['Sem dados', 0, '0']];
  };

  function prepareMetricData(data, title) {
    const metricData = [
      ['Métrica', 'Acidentes', { role: 'annotation' }],
      ...data.map(row => {
        const metric = row.highway;
        const accidents = row.data?.[1]?.[1] ?? 0;
        return [metric, accidents, accidents.toString()];
      }),
    ];

    return {
      data: getChartData(sortDataByColumn(metricData, 1)),
      options: {
        ...options,
        title,
        hAxis: { ...options.hAxis, title },
      },
    };
  }

  const options = {
    vAxis: { title: 'Quantidade de Acidentes ' },
    seriesType: 'bars',
    axes: {
      y: {
        1: { side: 'left' }
      }
    },
    hAxis: {
      textPosition: 'bottom'
    },
    colors: ["#083D77"],
    legend: { position: 'top' },
    interpolateNulls: true,
  };

  const highway = prepareMetricData(highwayData, "Rodovia");
  const guardrail = prepareMetricData(guardrailData, "Guarda-corpo");
  const median = prepareMetricData(medianData, "Canteiro Central");
  const shoulder = prepareMetricData(shoulderData, "Acostamento");
  const speed = prepareMetricData(speedData, "Velocidade");

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-3/6 gap-1 box-border">
          <Chart chartType="ComboChart" width="100%" height="40vh" data={highway.data} options={highway.options} />
        </div>
        <div className="flex flex-col w-3/6 gap-1 box-border">
          <Chart chartType="ComboChart" width="100%" height="40vh" data={guardrail.data} options={guardrail.options} />
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-col w-3/6 gap-1 box-border">
          <Chart chartType="ComboChart" width="100%" height="40vh" data={median.data} options={median.options} />
        </div>
        <div className="flex flex-col w-3/6 gap-1 box-border">
          <Chart chartType="ComboChart" width="100%" height="40vh" data={shoulder.data} options={shoulder.options} />
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-col w-3/6 gap-1 box-border">
          <Chart chartType="ComboChart" width="100%" height="40vh" data={speed.data} options={speed.options} />
        </div>
      </div>
    </>
  );
}

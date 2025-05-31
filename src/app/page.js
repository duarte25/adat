"use client";

import InputSelect from "../component/InputSelect";
import { fetchApi } from "../utils/fetchApi";
import { Chart } from "react-google-charts";
import Filters from "../component/Filters";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { SpinnerCircular } from "spinners-react";
import { handleErrorMessages } from "@/errors/handleErrorMessage";

const ufFullName = {
  "AC": "Acre", "AL": "Alagoas", "AP": "Amapá", "AM": "Amazonas", "BA": "Bahia",
  "CE": "Ceará", "DF": "Distrito Federal", "ES": "Espírito Santo", "GO": "Goiás",
  "MA": "Maranhão", "MT": "Mato Grosso", "MS": "Mato Grosso do Sul", "MG": "Minas Gerais",
  "PA": "Pará", "PB": "Paraíba", "PR": "Paraná", "PE": "Pernambuco", "PI": "Piauí",
  "RJ": "Rio de Janeiro", "RN": "Rio Grande do Norte", "RS": "Rio Grande do Sul",
  "RO": "Rondônia", "RR": "Roraima", "SC": "Santa Catarina", "SP": "São Paulo",
  "SE": "Sergipe", "TO": "Tocantins"
};

export default function App() {
  const [metric, setMetric] = useState("Acidentes");
  const [year, setYear] = useState("2022");

  const { data, isLoading, error } = useQuery({
    queryKey: ["ufGetInformacoes", year],
    queryFn: async () => {
      const response = await fetchApi(`/uf?data=data_uf_${year}`, "GET");

      return response;
    }
  });

  const getMetricData = (metric, data) => {
    const dataUf = [['State', metric]];
    const fetchedUfCodes = new Set();

    if (data) {
      Object.keys(data).forEach(ufCode => {
        const { total_accident, total_death, total_involved, total_injured } = data[ufCode];
        const fullName = ufFullName[ufCode];

        if (fullName) {
          let valueToAdd = 0;
          if (metric === "Acidentes") valueToAdd = total_accident;
          else if (metric === "Óbitos") valueToAdd = total_death;
          else if (metric === "Envolvidos") valueToAdd = total_involved;
          else if (metric === "Feridos") valueToAdd = total_injured;

          dataUf.push([fullName, valueToAdd]);
          fetchedUfCodes.add(ufCode);
        }
      });
    }

    Object.keys(ufFullName).forEach(ufCode => {
      if (!fetchedUfCodes.has(ufCode)) {
        const fullName = ufFullName[ufCode];
        dataUf.push([fullName, 0]);
      }
    });

    return dataUf;
  };

  const options = {
    region: "BR",
    displayMode: "regions",
    resolution: 'provinces',
    colorAxis: { colors: ["#70eaf5", "#083D77"] },
    backgroundColor: "#F9F9F9",
    datalessRegionColor: "#FFFFFF",
    defaultColor: "#f5f5f5",
    enableRegionInteractivity: true,
    magnifyingGlass: { enable: true, zoomFactor: 7.5 }
  };

  const menuData = [
    { value: "Acidentes", label: "Acidentes" },
    { value: "Óbitos", label: "Óbitos" },
    { value: "Envolvidos", label: "Envolvidos" },
    { value: "Feridos", label: "Feridos" }
  ];

  const yearData = [
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
  ];

  useEffect(() => {
    if (error) {
      handleErrorMessages(error?.response?.data?.errors || []);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center pt-5 gap-5">
      <div className="w-1/2">
        <div className="flex flex-row mb-1">
          <hr className="mr-1 bg-yale-blue h-5 w-1" />
          <h2>ESTATÍSTICA DE ACIDENTES POR <strong>ESTADOS</strong></h2>
        </div>
        <Filters
          inputSelect={
            <>
              <InputSelect
                data={menuData}
                selectLabel={"Métrica"}
                onChange={(e) => setMetric(e.target.value)}
                value={metric}
              />
              <InputSelect
                data={yearData}
                selectLabel={"Ano"}
                onChange={(e) => setYear(e.target.value)}
                value={year}
              />
            </>
          }
        />
      </div>
      <div className="relative h-4/5 w-full px-10">
        <Chart
          chartType="GeoChart"
          data={getMetricData(metric, data)}
          options={options}
          width={"100%"}
          height={"500px"}
        />
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
            <SpinnerCircular
              size={60}
              thickness={150}
              speed={100}
              color="#083D77"
              secondaryColor="rgba(0, 0, 0, 0.2)"
            />
          </div>
        )}
      </div>
    </div>
  );
}

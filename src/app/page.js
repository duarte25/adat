"use client"
import React from "react";
import { Chart } from "react-google-charts";
import Filters from "../component/Filters";
import Styles from "./page.module.css";
import Select from "../component/InputSelect";
import { fetchApi } from "../utils/fetchApi.js";
import { useQuery } from "react-query";

// Mapeamento de siglas para nomes completos dos estados
const ufFullName = {
  "AC": "Acre",
  "AL": "Alagoas",
  "AP": "Amapá",
  "AM": "Amazonas",
  "BA": "Bahia",
  "CE": "Ceará",
  "DF": "Distrito Federal",
  "ES": "Espírito Santo",
  "GO": "Goiás",
  "MA": "Maranhão",
  "MT": "Mato Grosso",
  "MS": "Mato Grosso do Sul",
  "MG": "Minas Gerais",
  "PA": "Pará",
  "PB": "Paraíba",
  "PR": "Paraná",
  "PE": "Pernambuco",
  "PI": "Piauí",
  "RJ": "Rio de Janeiro",
  "RN": "Rio Grande do Norte",
  "RS": "Rio Grande do Sul",
  "RO": "Rondônia",
  "RR": "Roraima",
  "SC": "Santa Catarina",
  "SP": "São Paulo",
  "SE": "Sergipe",
  "TO": "Tocantins"
};

export default function App() {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["veiculoGetInformacoes"],
    queryFn: async () => {
      const response = await fetchApi("/uf", "GET");
      return response;
    }
  });

  console.log(data)

  // Estrutura inicial de dados para o GeoChart
  const dataUf = [
    ['State', 'Accidents', 'Deaths']
    // Preencha dinamicamente com os dados recebidos
  ];

  // Preenche dataUf com os dados recebidos do fetch
  if (data) {
    Object.keys(data).forEach(uf => {
      const { count, total_death } = data[uf];
      const fullName = ufFullName[uf];
      if (fullName) {
        dataUf.push([fullName, count, total_death]);
      }
    });
  }

  const options = {
    region: "BR",
    resolution: 'provinces',
    colorAxis: { colors: ["#00853f", "black", "#e31b23"] },
    backgroundColor: "#81d4fa",
    datalessRegionColor: "#f8bbd0",
    defaultColor: "#f5f5f5",
  };

  const menuData = [
    { value: 10, label: "2021" },
    { value: 20, label: "2022" },
    { value: 30, label: "2023" },
  ];

  return (
    <div className={Styles.container}>
      <Filters inputSelect={
        <>
          <Select data={menuData} selectLabel={"Age"} />
        </>
      } />
      <Chart
        chartType="GeoChart"
        width="100%"
        height="400px"
        data={dataUf}
        options={options}
      />
    </div>
  );
}
"use client"
import React from "react";
import Filters from "../../component/Filters";
import Styles from "./styles.module.css";
import Select from "../../component/InputSelect";

export default function Climas() {
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
          <Select data={menuData} selectLabel={"Gender"} />
        </>
      } />

    </div>
  );
}

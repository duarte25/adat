import Styles from "./styles.module.css";
import * as React from "react";
import Select from "../InputSelect";
import Button from "../Button";


export default function Filters() {

    const menuData = [
        { value: 10, label: "2021" },
        { value: 20, label: "2022" },
        { value: 30, label: "2023" },
    ];

    return (
        <div className={Styles.container}>
            <Select data={menuData} selectLabel={"Age"} />
            <Button />
        </div>
    )
}
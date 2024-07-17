import Styles from "./styles.module.css";
import * as React from "react";
import Button from "../Button";

export default function Filters({ inputSelect, onButtonClick }) {
    return (
        <div className={Styles.container}>
            <div className={Styles.containerSelect}>
                {inputSelect}
            </div>
            <div className={Styles.button}>
                <Button onClick={onButtonClick} />
            </div>
        </div>
    );
}

import Styles from "./styles.module.css";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function InputSelect({data, selectLabel}) {

    const [age, setAge] = React.useState('');

    return (
        <FormControl className={Styles.formSelect} fullWidth>
            <InputLabel
                className={Styles.inputLabel}
                id="demo-simple-select-label">{selectLabel}</InputLabel>
            <Select
                sx={{ height: "2.1vw" }}
                labelId="demo-simple-select-label"
                value={age}
                label="Age"
            >
                {data.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
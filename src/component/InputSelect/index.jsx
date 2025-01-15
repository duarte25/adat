import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";

export default function InputSelect({ data, selectLabel, onChange, value }) {
    return (
        <FormControl className="bg-white h-full w-1/6" fullWidth>
            <InputLabel
                className="text-lg flex items-center w-full h-full"
                id="demo-simple-select-label">{selectLabel}</InputLabel>
            <Select
                sx={{ height: "2.1vw" }}
                labelId="demo-simple-select-label"
                value={value}
                onChange={onChange}
                label={selectLabel}
            >
                {data.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

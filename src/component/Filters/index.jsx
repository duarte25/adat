import Styles from "./styles.module.css";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '../Button';


export default function Filters(props) {

    const [age, setAge] = React.useState('');

    return (
        <div className={Styles.container}>
            <div className={Styles.select}>
                <FormControl sx={{ backgroundColor: 'white' }} fullWidth>
                    <InputLabel sx={{
                        fontSize: "0.7vw"
                    }} 
                    
                    id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        sx={{height: "2.1vw"}}
                        labelId="demo-simple-select-label"
                        value={age}
                        label="Age"
                    >
                        <MenuItem value={10}>2021</MenuItem>
                        <MenuItem value={20}>2022</MenuItem>
                        <MenuItem value={30}>2023</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <Button/>
        </div>
    )
}
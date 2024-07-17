import Styles from "./styles.module.css";
import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonSearch({ onClick }) {
    return (
        <Button onClick={onClick} className={Styles.button} variant="contained">Buscar</Button>
    )
}
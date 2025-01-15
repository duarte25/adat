import Button from '@mui/material/Button';
import * as React from 'react';

export default function ButtonSearch({ onClick }) {
    return (
        <Button onClick={onClick} className="h-2/3 w-2/12 bg-yale-blue" variant="contained">Buscar</Button>
    )
}
import Button from '@mui/material/Button';
import * as React from 'react';

export default function ButtonSearch({ onClick }) {
    return (
        <Button 
            onClick={onClick} 
            className="h-12 bg-yale-blue sm:w-4/6 md:w-2/6 lg:w-3/12" 
            variant="contained"
        >
            Buscar
        </Button>
    )
}

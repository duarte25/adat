'use client'; // Marcar o componente como Client Component

import React, { useEffect } from 'react';
import mapaBrasil from 'mapa-brasil';

const MapaBrasilComponent = () => {
  useEffect(() => {
    // Inicializa o mapa após o carregamento do componente
    const mapaElement = document.getElementById('mapa');
    if (mapaElement) {
      mapaBrasil(mapaElement, {
        unidadeData: [
          { codIbge: 52, fillColor: '#d82b40' },
          { codIbge: 43, fillColor: '#d82b40' },
          { codIbge: 11, fillColor: '#ffa700', strokeColor: '#008744', strokeWidth: 4 },
        ],
        onClick: function (data) {
          console.log(data);
        }
      });
    }
  }, []);

  return (
    <div id="mapa" style={{ height: '600px', width: '600px' }}></div>
  );
};

export default MapaBrasilComponent;

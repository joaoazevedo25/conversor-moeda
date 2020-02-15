import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const url = 'https://api.exchangeratesapi.io/latest';

function App() {
  const [tipoMoeda, setTipoMoeda] = useState([]);
  const [deMoeda, setDeMoeda] = useState();
  const [paraMoeda, setParaMoeda] = useState();
  const [quantia, setQuantia] = useState(1);
  const [quantiaDeMoeda, setQuantiaDeMoeda] = useState(true);
  const [cambio, setCambio] = useState();

  let deQuantia, paraQuantia;

  if (quantiaDeMoeda) {
    deQuantia = quantia;
    paraQuantia = quantia * cambio;
  } else {
    paraQuantia = quantia;
    deQuantia = quantia / cambio;
  }

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(info => {
        const primeiraMoeda = Object.keys(info.rates)[0];
        setTipoMoeda([info.base, ...Object.keys(info.rates)])
        setDeMoeda(info.base);
        setParaMoeda(primeiraMoeda);
        setCambio(info.rates[primeiraMoeda]);
      })
  }, [])

  useEffect(() => {
    if (deMoeda != null && paraMoeda != null) {
      fetch(`${url}?base=${deMoeda}&symbols=${paraMoeda}`)
        .then(response => response.json())
        .then(info => setCambio(info.rates[paraMoeda]))
    }
  }, [deMoeda, paraMoeda])

  function handleDeQuantia(e) {
    setQuantia(e.target.value);
    setQuantiaDeMoeda(true)
  }

  function handleParaQuantia(e) {
    setQuantia(e.target.value);
    setQuantiaDeMoeda(false)
  }

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        tipoMoeda={tipoMoeda}
        selectedMoeda={deMoeda}
        onChangeMoeda={e => setDeMoeda(e.target.value)}
        onChangeQuantia={handleDeQuantia}
        quantia={deQuantia}
      />
      <div className="igual">=</div>
      <CurrencyRow
        tipoMoeda={tipoMoeda}
        selectedMoeda={paraMoeda}
        onChangeMoeda={e => setParaMoeda(e.target.value)}
        onChangeQuantia={handleParaQuantia}
        quantia={paraQuantia}
      />
    </>
  );
}

export default App;

import React from 'react';

export default function CurrencyRow(props){
    const {
        tipoMoeda,
        selectedMoeda,
        onChangeMoeda,
        quantia,
        onChangeQuantia
    } = props

    return (
        <div>
            <input type="number" className="input" value={quantia} onChange={onChangeQuantia}/>
            <select value={selectedMoeda} onChange={onChangeMoeda}>
                {tipoMoeda.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
import React from 'react';

import './AddItem.css'

export function AddItem({ handleAdd, onChange, value }) {

    return (
        <>
            <div className="Login-title">
                <h1>Adicionar glicemia</h1>
            </div>
            <form onSubmit={handleAdd}>
                <div>
                    <input
                        placeholder="Insira uma nova Glicemia *"
                        className="Login-Field"
                        name="blood_glucoses"
                        id="blood_glucoses"
                        required value={value}
                        onChange={onChange}
                    />
                </div>
                <div className="AddGlucose">
                    <button className="AddGlucose-Btn" type="submit">Adicionar</button>
                </div>
            </form>
        </>
    )
}
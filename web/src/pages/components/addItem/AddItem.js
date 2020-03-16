import React, { useState } from 'react'
import api from '../../../services/api';
import { getId } from '../../../services/auth';

import './AddItem.css'

export function AddItem({ glucose }) {

    const [users, setUsers] = useState([]); //controle usuários
    const [value, setValue] = useState(glucose.value);

    async function handleSubmitBlood(e) {
        e.preventDefault()

        const id = getId();

        await api.post(`/user/${id}/add_glucose`, {
            blood_glucoses: [{ value }]
        })
            .then(response => {
                setUsers([...users, response.data]); //controle de acesso
                console.log(response.data.user)
            })
            .catch(error => {
                console.log(error)
            })

        setValue('');

    }

    return (
        <>
            <div className="Login-title">
                <h1>Adicionar glicemia</h1>
            </div>
            <form onSubmit={handleSubmitBlood}>
                <div>
                    <input
                        placeholder="Insira uma nova Glicemia *"
                        className="Login-Field"
                        name="blood_glucoses"
                        id="blood_glucoses"
                        required value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <div className="AddGlucose">
                    <button className="AddGlucose-Btn" type="submit">Adicionar</button>
                </div>
            </form>
        </>
    )
}
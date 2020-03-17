import React, { useState } from 'react'
import api from '../../../services/api';
import { getId } from '../../../services/auth';

import './AddItem.css'

export function AddItem({ glucose }) {

    const [users, setUsers] = useState([]); //controle usuários
    const [value, setValue] = useState(glucose.value);

    const [carbTotal, setCarbTotal] = useState('');
    const [foodType, setFoodType] = useState(String);

    async function handleAddNewFood(e) {
        e.preventDefault();

        const id = getId();

        await api.post(`/user/${id}/add_newFood`, {
            value,
            carbTotal,
            foodType
        })
            .then(response => {
                setUsers([...users, response.data]); //controle de acesso
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })

        setValue('');

        setCarbTotal('');


    }
/*
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
*/

    return (
        <>
            <div className="AddItem-title">
                <h1>Adicionar nova refeição</h1>
            </div>
            <form onSubmit={handleAddNewFood}>
                <div className="AddItem-body">
                    <label>
                        Tipo da Refeição:
                        <select className="AddItem-Field" value={foodType} onChange={e => setFoodType(e.target.value)}>
                            <option value=""> Selecione </option>
                            <option value="breakfastCHO"> Café da Manhã </option>
                            <option value="lunchCHO"> Almoço </option>
                            <option value="afternoonSnackCHO"> Lanche da Tarde </option>
                            <option value="dinnerCHO"> Jantar </option>
                        </select>
                    </label>
                </div>
                <div className="AddItem-body">
                    <label>
                        Insira a Glicemia atual:
                        <input
                            placeholder="Insira uma nova Glicemia *"
                            className="AddItem-Field"
                            name="blood_glucoses"
                            id="blood_glucoses"
                            required value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </label>
                </div>
                <div className="AddItem-body">
                    <label>
                        CHO Total da Refeição:
                        <input
                            placeholder="Carb Total (g)"
                            className="AddItem-Field"
                            name="carb_total"
                            id="carb_total"
                            required value={carbTotal}
                            onChange={(e) => setCarbTotal(e.target.value)}
                        />
                    </label>
                </div>
                <div className="AddGlucose">
                    <button className="AddGlucose-Btn" type="submit">Adicionar</button>
                </div>
            </form>
        </>
    )
}
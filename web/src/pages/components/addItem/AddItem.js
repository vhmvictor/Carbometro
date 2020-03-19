import React, { useState, useEffect } from 'react'
import api from '../../../services/api';
import { getId } from '../../../services/auth';

import './AddItem.css'

export function AddItem({ glucose }) {

    const [users, setUsers] = useState([]); //controle usuários
    const [value, setValue] = useState(glucose.value);
    const [foods, setFoods] = useState([]);
    const [showFood, setShowFood] = useState(false);
    const [foodTarget, setFoodTarget] = useState('');

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

    async function handleSearchFood(fTarget) {

        await api.get(`SearchFoods?name=${fTarget}`)
            .then(response => {
                setFoods(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        setShowFood(true)
    }

    useEffect(() => {
        console.log(foods)
        setCarbTotal(foods.cho)
    }, [foods])

    return (
        <>
            <div className="AddItem-title">
                <h1>Adicionar nova refeição</h1>
            </div>
            <form>
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
                        Buscar alimento:
                        <input
                            placeholder="informe um alimento..."
                            className="AddItem-Field"
                            name="food"
                            id="food"
                            required value={foodTarget}
                            onChange={(e) => setFoodTarget(e.target.value)}
                        />
                    </label>
                </div>
            </form>
            <div className="AddGlucose">
                <button className="SearchFood-Btn" onClick={() => handleSearchFood(foodTarget)}>
                    Buscar
                </button>
            </div>
                {showFood ? (
                <div className="Table">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th style={{textAlign: 'center', fontSize:18, backgroundColor:'rgba(233, 72, 8, 0.959)'}}>Nome</th>
                                <th style={{textAlign: 'center', fontSize:18, backgroundColor:'rgba(233, 72, 8, 0.959)'}}>Medida</th>
                                <th style={{textAlign: 'center', fontSize:18, backgroundColor:'rgba(233, 72, 8, 0.959)'}}>g ou ml</th>
                                <th style={{textAlign: 'center', fontSize:18, backgroundColor:'rgba(233, 72, 8, 0.959)'}}>CHO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{textAlign: 'center', backgroundColor:'rgba(223, 221, 221, 0.959)'}}>
                                <td>{foods.name}</td><td>{foods.measure}</td><td>{foods.unitGram}</td><td>{foods.cho}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                ) : ('')}
            
            <div className="AddGlucose">
                <form onSubmit={handleAddNewFood}>
                    <button className="AddGlucose-Btn" type="submit">Adicionar refeição</button>
                </form>
            </div>
        </>
    )
}
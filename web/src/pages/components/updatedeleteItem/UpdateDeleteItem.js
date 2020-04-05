import React, { useState } from 'react';
import moment from 'moment'
import api from '../../../services/api';
import { getId } from '../../../services/auth';

import './UpdateDeleteItem.css'

export function UpdateDeleteItem({ glucose, foodName, foodMeasure, foodAddGram, foodChoCal, setFoods, foodId }) {

    const [editando, setEditando] = useState(false);
    const [value, setValue] = useState(glucose.blood_glucoses_value);

    console.log(glucose)
    console.log(foodName)
    console.log(foodMeasure)
    console.log(foodAddGram)
    console.log(foodChoCal)

    /*
    async function handleUpdateBlood(value, glucoseId) {

        const id = getId();

        await api.put(`/user/${id}/update/${glucoseId}`, { value })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })

        window.location.reload(false);

    }
    */

     /*
    const handleEdit = () => {

        if (editando && glucose.blood_glucoses_value !== value) {
            handleUpdateBlood(value, glucose._id);
            console.log(glucose._id)
        }
        setEditando(prevStateEdit => !prevStateEdit);
    };
    */

    function handleDeleteBlood(foodId) {

        const id = getId();

        api.delete(`/user/${id}/delete/${foodId}`)
            .then(response => {
                const food = response.data.addFoods
                setFoods(food);
            })
            .catch(error => {
                console.log(error)
            })

        window.location.reload(false);

    }

    return (
        <>
            <div className="Show-Glucoses-Value">
                {editando ? (
                    <input className="input-btn"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                ) : (
                        <>
                            {glucose.updatedAt ? (
                                <div className="updatedAt-value">
                                    <strong>Editado: {moment(new Date(glucose.updatedAt)).format('D/MM - h:mm A')} </strong>
                                </div>
                            ) : (
                                    <div className="createdAt-value">
                                        <strong> {moment(new Date(glucose.createdAt)).format('D/MM - h:mm A')} </strong>
                                    </div>
                                )}
                            {glucose.blood_glucoses_value !== 100 && glucose.blood_glucoses_value !== 99 && glucose.blood_glucoses_value !== 101 && glucose.blood_glucoses_value !== 200 && glucose.blood_glucoses_value !== 300 && glucose.blood_glucoses_value !== 400 ? (
                                <div className="Padrao-value">
                                </div>
                            ) : ('')}
                            {glucose.blood_glucoses_value >= 70 && glucose.blood_glucoses_value < 80 ? (
                                <div className="Padrao-value">
                                    <h1> {glucose.blood_glucoses_value} mg/dl </h1>
                                    <h3>Bolus: {glucose.totalInsulin} UI</h3>
                                    <li> Correção: {glucose.totalInsulinCorr} UI </li>
                                    <li> Refeição: {glucose.totalInsulinBolus} UI </li>
                                    <p>Total de CHO: {glucose.totalChoFood} g</p>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">g ou ml</th>
                                                <th scope="col">CHO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>
                                                {foodName && foodName.length > 0 && foodName.map((foodN, index) => (
                                                    <div key={index}>
                                                        {foodN}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodAddGram && foodAddGram.length > 0 && foodAddGram.map((foodGram, index) => (
                                                    <div key={index}>
                                                        {foodGram}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodChoCal && foodChoCal.length > 0 && foodChoCal.map((foodCho, index) => (
                                                    <div key={index}>
                                                        {foodCho}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                            {glucose.blood_glucoses_value > 140 && glucose.blood_glucoses_value <= 180 ? (
                                <div className="Padrao-value">
                                    <h1> {glucose.blood_glucoses_value} mg/dl </h1>
                                    <h3>Bolus: {glucose.totalInsulin} UI</h3>
                                    <li> Correção: {glucose.totalInsulinCorr} UI </li>
                                    <li> Refeição: {glucose.totalInsulinBolus} UI </li>
                                    <p>Total de CHO: {glucose.totalChoFood} g</p>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">g ou ml</th>
                                                <th scope="col">CHO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>
                                                {foodName && foodName.length > 0 && foodName.map((foodN, index) => (
                                                    <div key={index}>
                                                        {foodN}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodAddGram && foodAddGram.length > 0 && foodAddGram.map((foodGram, index) => (
                                                    <div key={index}>
                                                        {foodGram}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodChoCal && foodChoCal.length > 0 && foodChoCal.map((foodCho, index) => (
                                                    <div key={index}>
                                                        {foodCho}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                            {glucose.blood_glucoses_value >= 80 && glucose.blood_glucoses_value <= 140 && glucose.blood_glucoses_value !== 100 && glucose.blood_glucoses_value !== 99 && glucose.blood_glucoses_value !== 101 && glucose.blood_glucoses_value !== 200 && glucose.blood_glucoses_value !== 300 && glucose.blood_glucoses_value !== 400 ? (
                                <div className="Uni-value">
                                    <h1> {glucose.blood_glucoses_value} mg/dl </h1>
                                    <h3>Bolus: {glucose.totalInsulin} UI</h3>
                                    <li> Correção: {glucose.totalInsulinCorr} UI </li>
                                    <li> Refeição: {glucose.totalInsulinBolus} UI </li>
                                    <p>Total de CHO: {glucose.totalChoFood} g</p>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">g ou ml</th>
                                                <th scope="col">CHO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>
                                                {foodName && foodName.length > 0 && foodName.map((foodN, index) => (
                                                    <div key={index}>
                                                        {foodN}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodAddGram && foodAddGram.length > 0 && foodAddGram.map((foodGram, index) => (
                                                    <div key={index}>
                                                        {foodGram}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodChoCal && foodChoCal.length > 0 && foodChoCal.map((foodCho, index) => (
                                                    <div key={index}>
                                                        {foodCho}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                            {glucose.blood_glucoses_value === 99 ? (
                                <div className="Uni-value">
                                    <h1> {glucose.blood_glucoses_value} mg/dl </h1>
                                    <img src={process.env.PUBLIC_URL + "/dory.gif"} alt="unicarb" width="150px" height="150px" />
                                    <h3>Bolus: {glucose.totalInsulin} UI</h3>
                                    <li> Correção: {glucose.totalInsulinCorr} UI </li>
                                    <li> Refeição: {glucose.totalInsulinBolus} UI </li>
                                    <p>Total de CHO: {glucose.totalChoFood} g</p>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">g ou ml</th>
                                                <th scope="col">CHO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>
                                                {foodName && foodName.length > 0 && foodName.map((foodN, index) => (
                                                    <div key={index}>
                                                        {foodN}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodAddGram && foodAddGram.length > 0 && foodAddGram.map((foodGram, index) => (
                                                    <div key={index}>
                                                        {foodGram}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodChoCal && foodChoCal.length > 0 && foodChoCal.map((foodCho, index) => (
                                                    <div key={index}>
                                                        {foodCho}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                            {glucose.blood_glucoses_value === 100 ? (
                                <div className="Uni-value">
                                    <h1> {glucose.blood_glucoses_value} mg/dl </h1>
                                    <img src={process.env.PUBLIC_URL + "/uni.gif"} alt="unicarb" width="150px" height="150px" />
                                    <h3>Bolus: {glucose.totalInsulin} UI</h3>
                                    <li> Correção: {glucose.totalInsulinCorr} UI </li>
                                    <li> Refeição: {glucose.totalInsulinBolus} UI </li>
                                    <p>Total de CHO: {glucose.totalChoFood} g</p>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">g ou ml</th>
                                                <th scope="col">CHO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>
                                                {foodName && foodName.length > 0 && foodName.map((foodN, index) => (
                                                    <div key={index}>
                                                        {foodN}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodAddGram && foodAddGram.length > 0 && foodAddGram.map((foodGram, index) => (
                                                    <div key={index}>
                                                        {foodGram}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodChoCal && foodChoCal.length > 0 && foodChoCal.map((foodCho, index) => (
                                                    <div key={index}>
                                                        {foodCho}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                            {glucose.blood_glucoses_value === 101 ? (
                                <div className="Uni-value">
                                    <h1> {glucose.blood_glucoses_value} mg/dl </h1>
                                    <img src={process.env.PUBLIC_URL + "/dalmatas.gif"} alt="unicarb" width="150px" height="150px" />
                                    <h3>Bolus: {glucose.totalInsulin} UI</h3>
                                    <li> Correção: {glucose.totalInsulinCorr} UI </li>
                                    <li> Refeição: {glucose.totalInsulinBolus} UI </li>
                                    <p>Total de CHO: {glucose.totalChoFood} g</p>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">g ou ml</th>
                                                <th scope="col">CHO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>
                                                {foodName && foodName.length > 0 && foodName.map((foodN, index) => (
                                                    <div key={index}>
                                                        {foodN}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodAddGram && foodAddGram.length > 0 && foodAddGram.map((foodGram, index) => (
                                                    <div key={index}>
                                                        {foodGram}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodChoCal && foodChoCal.length > 0 && foodChoCal.map((foodCho, index) => (
                                                    <div key={index}>
                                                        {foodCho}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                            {glucose.blood_glucoses_value === 200 ? (
                                <div className="Hiper-value">
                                    <strong> Hiper </strong>
                                    <h1> {glucose.blood_glucoses_value} mg/dl </h1>
                                    <img src={process.env.PUBLIC_URL + "/camelo.gif"} alt="unicarb" width="150px" height="150px" />
                                    <h3>Bolus: {glucose.totalInsulin} UI</h3>
                                    <li> Correção: {glucose.totalInsulinCorr} UI </li>
                                    <li> Refeição: {glucose.totalInsulinBolus} UI </li>
                                    <p>Total de CHO: {glucose.totalChoFood} g</p>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">g ou ml</th>
                                                <th scope="col">CHO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>
                                                {foodName && foodName.length > 0 && foodName.map((foodN, index) => (
                                                    <div key={index}>
                                                        {foodN}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodAddGram && foodAddGram.length > 0 && foodAddGram.map((foodGram, index) => (
                                                    <div key={index}>
                                                        {foodGram}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodChoCal && foodChoCal.length > 0 && foodChoCal.map((foodCho, index) => (
                                                    <div key={index}>
                                                        {foodCho}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                            {glucose.blood_glucoses_value === 300 ? (
                                <div className="Hiper-value">
                                    <strong> Hiper </strong>
                                    <h1> {glucose.blood_glucoses_value} mg/dl </h1>
                                    <img src={process.env.PUBLIC_URL + "/rino.gif"} alt="unicarb" width="150px" height="150px" />
                                    <h3>Bolus: {glucose.totalInsulin} UI</h3>
                                    <li> Correção: {glucose.totalInsulinCorr} UI </li>
                                    <li> Refeição: {glucose.totalInsulinBolus} UI </li>
                                    <p>Total de CHO: {glucose.totalChoFood} g</p>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">g ou ml</th>
                                                <th scope="col">CHO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>
                                                {foodName && foodName.length > 0 && foodName.map((foodN, index) => (
                                                    <div key={index}>
                                                        {foodN}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodAddGram && foodAddGram.length > 0 && foodAddGram.map((foodGram, index) => (
                                                    <div key={index}>
                                                        {foodGram}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodChoCal && foodChoCal.length > 0 && foodChoCal.map((foodCho, index) => (
                                                    <div key={index}>
                                                        {foodCho}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                            {glucose.blood_glucoses_value === 400 ? (
                                <div className="Hiper-value">
                                    <strong> Hiper </strong>
                                    <h1> {glucose.blood_glucoses_value} mg/dl </h1>
                                    <img src={process.env.PUBLIC_URL + "/dino.gif"} alt="unicarb" width="150px" height="150px" />
                                    <h3>Bolus: {glucose.totalInsulin} UI</h3>
                                    <li> Correção: {glucose.totalInsulinCorr} UI </li>
                                    <li> Refeição: {glucose.totalInsulinBolus} UI </li>
                                    <p>Total de CHO: {glucose.totalChoFood} g</p>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">g ou ml</th>
                                                <th scope="col">CHO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>
                                                {foodName && foodName.length > 0 && foodName.map((foodN, index) => (
                                                    <div key={index}>
                                                        {foodN}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodAddGram && foodAddGram.length > 0 && foodAddGram.map((foodGram, index) => (
                                                    <div key={index}>
                                                        {foodGram}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodChoCal && foodChoCal.length > 0 && foodChoCal.map((foodCho, index) => (
                                                    <div key={index}>
                                                        {foodCho}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                            {glucose.blood_glucoses_value > 180 && glucose.blood_glucoses_value !== 200 && glucose.blood_glucoses_value !== 300 && glucose.blood_glucoses_value !== 400 ? (
                                <div className="Hiper-value">
                                    <strong> Hiper </strong>
                                    <h1> {glucose.blood_glucoses_value} mg/dl </h1>
                                    <h3>Bolus: {glucose.totalInsulin} UI</h3>
                                    <li> Correção: {glucose.totalInsulinCorr} UI </li>
                                    <li> Refeição: {glucose.totalInsulinBolus} UI </li>
                                    <p>Total de CHO: {glucose.totalChoFood} g</p>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">g ou ml</th>
                                                <th scope="col">CHO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>
                                                {foodName && foodName.length > 0 && foodName.map((foodN, index) => (
                                                    <div key={index}>
                                                        {foodN}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodAddGram && foodAddGram.length > 0 && foodAddGram.map((foodGram, index) => (
                                                    <div key={index}>
                                                        {foodGram}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodChoCal && foodChoCal.length > 0 && foodChoCal.map((foodCho, index) => (
                                                    <div key={index}>
                                                        {foodCho}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                            {glucose.blood_glucoses_value < 70 ? (
                                <div className="Hipo-value">
                                    <strong> Hipo </strong>
                                    <h1> {glucose.blood_glucoses_value} mg/dl </h1>
                                    <h3>Bolus: {glucose.totalInsulin} UI</h3>
                                    <li> Correção: {glucose.totalInsulinCorr} UI </li>
                                    <li> Refeição: {glucose.totalInsulinBolus} UI </li>
                                    <p>Total de CHO: {glucose.totalChoFood} g</p>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">g ou ml</th>
                                                <th scope="col">CHO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>
                                                {foodName && foodName.length > 0 && foodName.map((foodN, index) => (
                                                    <div key={index}>
                                                        {foodN}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodAddGram && foodAddGram.length > 0 && foodAddGram.map((foodGram, index) => (
                                                    <div key={index}>
                                                        {foodGram}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                            <td>
                                                {foodChoCal && foodChoCal.length > 0 && foodChoCal.map((foodCho, index) => (
                                                    <div key={index}>
                                                        {foodCho}
                                                    </div>
                                                ))
                                                }
                                            </td>
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                        </>
                    )}
            </div>
            <div className="up-del-btn">
                <button className="btn-delete" onClick={() => handleDeleteBlood(foodId)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </>
    )
}

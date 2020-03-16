import React, { useState } from 'react';
import moment from 'moment'
import api from '../../../services/api';
import { getId } from '../../../services/auth';

import './UpdateDeleteItem.css'

export function UpdateDeleteItem({ glucose, setGlucoses }) {
    const [editando, setEditando] = useState(false);
    const [value, setValue] = useState(glucose.value);

    async function handleUpdateBlood(value, glucoseId) {

        const id = getId();

        await api.put(`/user/${id}/update/${glucoseId}`, { value })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })

    }

    function handleDeleteBlood(glucoseId) {

        const id = getId();

        api.delete(`/user/${id}/delete/${glucoseId}`)
            .then(response => {
                const bloods = response.data.blood_glucoses
                setGlucoses(bloods);
            })
            .catch(error => {
                console.log(error)
            })

    }

    const handleEdit = () => {

        if (editando && glucose.value !== value) {
            handleUpdateBlood(value, glucose._id);
        }
        setEditando(prevStateEdit => !prevStateEdit);
    };

    return (
        <div className="Show-Glucoses-Value">
            <div>
                <div>
                    {editando ? (
                        <input className="input-btn"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    ) : (
                            <div>
                                <div className="Item-Glucose-value">
                                    {glucose.updatedAt ? (
                                        <div className="updatedAt-value">
                                            <strong>Editado: {moment(new Date (glucose.updatedAt)).format('D/MM - h:mm A')} </strong>
                                        </div>
                                    ) : (
                                        <div className="createdAt-value">
                                            <strong> {moment(new Date (glucose.createdAt)).format('D/MM - h:mm A')} </strong>
                                        </div>
                                        )}
                                    {glucose.value !== 100 && glucose.value !== 99 && glucose.value !== 101 && glucose.value !== 200 && glucose.value !== 300 && glucose.value !== 400 ? (
                                        <div className="Padrao-value">
                                        </div>
                                    ) : ('')}
                                    {glucose.value >= 70 && glucose.value < 80 ? (
                                        <div className="Padrao-value">
                                            <h1>{glucose.value} mg/dl</h1>
                                        </div>
                                    ) : ('')}
                                    {glucose.value > 140 && glucose.value <= 180 ? (
                                        <div className="Padrao-value">
                                            <h1>{glucose.value} mg/dl</h1>
                                        </div>
                                    ) : ('')}
                                    {glucose.value >= 80 && glucose.value <= 140 ? (
                                        <div className="Uni-value">
                                            <h1>{glucose.value} mg/dl</h1>
                                        </div>
                                    ) : ('')}
                                    {glucose.value === 99 ? (
                                        <div className="Uni-value">
                                            <img src={process.env.PUBLIC_URL + "/dory.gif"} alt="unicarb" width="150px" height="150px"/>
                                        </div>
                                    ) : ('')}
                                    {glucose.value === 100 ? (
                                        <div className="Uni-value">
                                            <img src={process.env.PUBLIC_URL + "/uni.gif"} alt="unicarb" width="150px" height="150px" />
                                        </div>
                                    ) : ('')}
                                    {glucose.value === 101 ? (
                                        <div className="Uni-value">
                                            <img src={process.env.PUBLIC_URL + "/dalmatas.gif"} alt="unicarb" width="150px" height="150px" />
                                        </div>
                                    ) : ('')}
                                    {glucose.value === 200 ? (
                                        <div className="Hiper-value">
                                            <h1>{glucose.value} mg/dl</h1>
                                            <img src={process.env.PUBLIC_URL + "/camelo.gif"} alt="unicarb" width="150px" height="150px" />
                                        </div>
                                    ) : ('')}
                                    {glucose.value === 300 ? (
                                        <div className="Hiper-value">
                                            <h1>{glucose.value} mg/dl</h1>
                                            <img src={process.env.PUBLIC_URL + "/rino.gif"} alt="unicarb" width="150px" height="150px" />
                                        </div>
                                    ) : ('')}
                                    {glucose.value === 400 ? (
                                        <div className="Hiper-value">
                                            <h1>{glucose.value} mg/dl</h1>
                                            <img src={process.env.PUBLIC_URL + "/dino.gif"} alt="unicarb" width="150px" height="150px" />
                                        </div>
                                    ) : ('')}
                                    {glucose.value > 180 && glucose.value !== 200 && glucose.value !== 300 && glucose.value !== 400 ? (
                                        <div className="Hiper-value">
                                            <h1> {glucose.value} mg/dl </h1>
                                            <strong> Hiper </strong>
                                        </div>
                                    ) : ('')}
                                    {glucose.value < 70 ? (
                                        <div className="Hipo-value">
                                            <h1> {glucose.value} mg/dl </h1>
                                            <strong> Hipo </strong>
                                        </div>
                                    ) : ('')}
                                </div>

                            </div>
                        )}
                </div>
                <div className="up-del-btn">
                    {!editando ? (

                        <button className="btn-edit" onClick={() => handleEdit()}>
                            <i className="fas fa-pen"></i>
                        </button>
                    ) : (
                            <button className="btn-save" onClick={() => handleEdit()}>
                                <i className="fas fa-check"></i>
                            </button>
                        )}
                    <button className="btn-delete" onClick={() => handleDeleteBlood(glucose._id)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

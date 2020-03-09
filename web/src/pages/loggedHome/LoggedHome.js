import React, { useState, useEffect } from 'react'
import { logout } from '../../services/auth'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { getId } from '../../services/auth';

import './LoggedHome.css'
import { UpdateDeleteItem } from '../components/updatedeleteItem/UpdateDeleteItem'
import { AddItem } from '../components/addItem/AddItem'

const LoggedHome = () => {

    const [users, setUsers] = useState([]); //controle usuários
    const [glucoses, setGlucoses] = useState([]);
    const [value, setValue] = useState([]);
    const [reflesh, setReflesh] = useState(false)
    const [redirect, setRedirect] = useState(false);

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

        setReflesh(true)
    }

    async function handleUpdateBlood(value, glucoseId) {

        const id = getId();

        await api.put(`/user/${id}/update/${glucoseId}`, {value}) 
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })

        setReflesh(true);
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

        setReflesh(true)
    }

    useEffect(() => {
        async function handleShowBloods() {

            const id = getId();

            await api.get(`/user/searchGlucose/${id}`)
                .then(response => {
                    const bloods = response.data.blood_glucoses
                    setGlucoses(bloods);
                })
                .catch(error => {
                    console.log(error)
                })
        }

        handleShowBloods()

        setReflesh(false)

    }, [reflesh]);

    async function handleLogout(e) {
        e.preventDefault()

        logout();

        setRedirect(true);
    }

    if (redirect) return <Redirect to="/login" />

    return (
        <>
            <header className="Logged-header">
                <div className="Carb-title">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1>Carbometro</h1>
                    </Link>
                </div>
                <div className="Btn-header">
                    <button className="Btn-logout" onClick={handleLogout}>
                        Logout
                </button>
                </div>
            </header>
            <div className="Logged-Home">
                <AddItem
                    handleAdd={handleSubmitBlood}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <div className="Show-Glucoses">
                    {glucoses.map(glucose => (
                        <UpdateDeleteItem
                            key={glucose._id}
                            glucose={glucose}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            handleUpdateBlood={handleUpdateBlood}
                            handleDeleteBlood={handleDeleteBlood}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default LoggedHome

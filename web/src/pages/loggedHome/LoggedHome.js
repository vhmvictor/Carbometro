import React, { useState } from 'react'
import { logout } from '../../services/auth'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { getId } from '../../services/auth';

import './LoggedHome.css'

const LoggedHome = () => {

    const [users, setUsers] = useState([]); //controle usuários
    const [glucoses, setGlucoses] = useState([]);
    const [value, setValue] = useState([]);
    const [redirect, setRedirect] = useState(false);

    async function getUserId() {

        const id = getId();

        await api.get(`/user/${id}`)
            .then(response => {
                //console.log(response.data.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    getUserId()

    async function handleSubmitBlood(e) {
        e.preventDefault()

        const id = getId();

        await api.post(`/user/add_glucose/${id}`, {
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

    async function handleShowBloods(e) {
        e.preventDefault()

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
            <div>
                <div className="Login-title">
                    <h1>Adicionar glicemia</h1>
                </div>
                <form onSubmit={handleSubmitBlood}>
                    <div>
                        <input
                            placeholder="Glicemia *"
                            className="Login-Field"
                            name="blood_glucoses"
                            id="blood_glucoses"
                            required value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                    <button className="Login-Btn" type="submit">Adicionar</button>
                </form>
                <div onClick={handleShowBloods}>
                    <button className="Login-Btn" type="submit">Glicemias</button>
                </div>
                <div>
                    {glucoses.map(glucose =>
                        <div key={glucose._id}>
                            <div>
                                <strong>
                                    {glucose.value}
                                </strong>
                            </div>
                            <div>
                                <strong>
                                    {glucose._id}
                                </strong>
                            </div>
                            <div>
                                <strong>
                                    {glucose.createdAt}
                                </strong>
                            </div>

                        </div>)}
                </div>
            </div>
        </>
    )
}

export default LoggedHome

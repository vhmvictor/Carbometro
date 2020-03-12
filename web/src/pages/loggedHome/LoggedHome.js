import React, { useState, useEffect } from 'react'
import { logout } from '../../services/auth'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { getId } from '../../services/auth';

import './LoggedHome.css'
import { UpdateDeleteItem } from '../components/updatedeleteItem/UpdateDeleteItem'
import { AddItem } from '../components/addItem/AddItem'
import { ModalItem } from '../components/modalItem/ModalItem'

const LoggedHome = () => {

    const [users, setUsers] = useState([]); //controle usuários
    const [glucoses, setGlucoses] = useState([]);
    const [value, setValue] = useState([]);
    const [breakfastCHO, setBreakfastCHO] = useState('');
    const [lunchCHO, setLunchCHO] = useState('');
    const [afternoonSnackCHO, setAfternoonSnackCHO] = useState('');
    const [dinnerCHO, setDinnerCHO] = useState('');
    const [born, setBorn] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [sexo, setSexo] = useState('');
    const [typeDm, setTypeDm] = useState('');
    const [reflesh, setReflesh] = useState(false)
    const [redirect, setRedirect] = useState(false);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

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

    async function handleSubmitParams(e) {
        e.preventDefault()

        const id = getId();

        await api.post(`/user/${id}/add_params`,
            {
                breakfastCHO,
                lunchCHO,
                afternoonSnackCHO,
                dinnerCHO,
                born,
                weight,
                height,
                sexo,
                typeDm
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })

        setReflesh(true);
        setShow(false)
    }

    async function handleUpdateBlood(value, glucoseId) {

        const id = getId();

        await api.put(`/user/${id}/update/${glucoseId}`, { value })
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
                <div className="Btn-logged-header">
                    <button className="Btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                    <button className="Btn-config" onClick={handleShow}>
                        <i class="material-icons" >build</i>
                    </button>
                    <div>
                        <ModalItem
                            show={show}
                            handleClose={handleClose}
                            handleSubmitParams={handleSubmitParams}
                            onChangeBor={(e) => setBorn(e.target.value)}
                            onChangeW={(e) => setWeight(e.target.value)}
                            onChangeH={(e) => setHeight(e.target.value)}
                            onChangeS={(e) => setSexo(e.target.value)}
                            onChangeT={(e) => setTypeDm(e.target.value)}
                            onChangeB={(e) => setBreakfastCHO(e.target.value)}
                            onChangeL={(e) => setLunchCHO(e.target.value)}
                            onChangeA={(e) => setAfternoonSnackCHO(e.target.value)}
                            onChangeD={(e) => setDinnerCHO(e.target.value)}
                            born={born}
                            weight={weight}
                            height={height}
                            sexo={sexo}
                            typeDm={typeDm}
                            breakfastCHO={breakfastCHO}
                            lunchCHO={lunchCHO}
                            afternoonSnackCHO={afternoonSnackCHO}
                            dinnerCHO={dinnerCHO}
                        />
                    </div>
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

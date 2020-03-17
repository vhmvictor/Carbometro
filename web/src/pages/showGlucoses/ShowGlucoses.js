import React, { useState } from 'react'
import { logout } from '../../services/auth'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { getId } from '../../services/auth';

import { UpdateDeleteItem } from '../components/updatedeleteItem/UpdateDeleteItem'
import { ModalItem } from '../components/modalItem/ModalItem'

const ShowGlucoses = () => {
    
    const [glucoses, setGlucoses] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleLoadBloods() {

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

    handleLoadBloods()

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
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                        <h1>Carbometro</h1>
                    </Link>
                </div>
                <div className="Btn-logged-header">
                    <button className="Btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                    <button className="Btn-config" onClick={handleShow}>
                        <i className="material-icons" >build</i>
                    </button>
                    <div>
                        <ModalItem
                            show={show}
                            setShow={setShow}
                            handleClose={handleClose}
                        />
                    </div>
                </div>
            </header>
            <div className="Logged-Home">
                <div className="Show-Glucoses">
                    {glucoses.map(glucose => (
                        <UpdateDeleteItem
                            key={glucose._id}
                            glucose={glucose}
                            setGlucoses={setGlucoses}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ShowGlucoses

import React, { useState } from 'react'
import { logout } from '../../services/auth'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import './LoggedHome.css'
import { ModalItem } from '../components/modalItem/ModalItem'

const LoggedHome = () => {
    
    const [redirect, setRedirect] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            <div className="Logged-Home-Functions">
                <Link to="/home/add_glucoses" style={{ color: 'white' }}>
                    <button className="Redirect-Btn">
                        <h1>Nova refeição</h1>
                    </button>
                </Link>
                <Link to="/home/show_glucoses" style={{ color: 'white' }}>
                    <button className="Redirect-Btn">
                        <h1>Relatório de glicemias</h1>
                    </button>
                </Link>
            </div>
        </>
    )
}

export default LoggedHome

import React, { useState } from 'react'
import { logout } from '../../services/auth'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import './LoggedHome.css'

const LoggedHome = () => {

    const [redirect, setRedirect] = useState(false);

    async function handleLogout(e) {
        e.preventDefault()

        logout();

        setRedirect(true);
    }

    if (redirect) return <Redirect to="/login" />

    return (
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
    )
}

export default LoggedHome

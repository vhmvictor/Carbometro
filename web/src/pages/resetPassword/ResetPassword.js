import React from 'react'
import { useState } from "react";
import api from '../../services/api';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import './ResetPassword.css'

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [token, setToken] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()

        await api.post('/reset_password', {
            email,
            token,
            password
        })
            .then(response => {
                setRedirect(true)
                console.log(redirect)
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    if (redirect) {
        return <Redirect to="/login" />
    }

    return (
        <>
            <header className="Reset-header">
                <div className="Carb-title">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1>Carbometro</h1>
                    </Link>
                </div>
            </header>
            <div className="ResetPassword">
                <div className="Reset-title">
                    <h1>Preencha as informações abaixo</h1>
                    <p>Ps: no campo token, informe o token que recebeu por email</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label id="inputTitle" htmlFor="email" ></label>
                        <input
                            placeholder="Email *"
                            className="ResetPassword-Field"
                            name="email"
                            id="email"
                            required value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label id="inputTitle" htmlFor="token" ></label>
                        <input
                            placeholder="Token *"
                            className="ResetPassword-Field"
                            name="token"
                            id="token"
                            required value={token}
                            onChange={e => setToken(e.target.value)}
                        />
                    </div>
                    <div>
                        <label id="inputTitle" htmlFor="newPassword" ></label>
                        <input
                            placeholder="New Password *"
                            className="ResetPassword-Field"
                            name="newPassword"
                            id="newPassword"
                            required value={password}
                            onChange={e => setpassword(e.target.value)}
                        />
                    </div>
                    <button className="ResetPassword-Btn" type="submit">Redefinir Senha</button>
                </form>
            </div>
        </>
    )
}

export default ResetPassword

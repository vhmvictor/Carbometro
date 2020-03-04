import React, { useState } from 'react'
import api from '../../services/api';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import ReactDOM from 'react-dom';

import './ForgotPassword.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()

        await api.post('/forgot_password', {
            email
        })
            .then(response => {
                setRedirect(true)
                console.log(redirect)
                console.log(response)
            })
            .catch(error => {
                console.log(error);

                const element = <div className="alert-alert-danger" role="alert">
                    Email incorreto!
                                </div>

                ReactDOM.render(element, document.getElementById("boot"));
            })
    }

    if (redirect) {
        return <Redirect to="/reset_password" />
    }

    return (
        <>
            <header className="Forgot-header">
                <div className="Carb-title">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1>Carbometro</h1>
                    </Link>
                </div>
            </header>
            <div className="ForgotPassword">
                <div className="Forgot-title">
                    <h1>Insira o email de cadastro</h1>
                    <p>Enviaremos um codigo de verificação em seu email</p>
                </div>
                <div id="boot">
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            placeholder="Email *"
                            className="ForgotPassword-Field"
                            name="email"
                            id="email"
                            required value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button className="ForgotPassword-Btn" type="submit">Enviar</button>
                </form>
            </div>
        </>
    )
}

export default ForgotPassword

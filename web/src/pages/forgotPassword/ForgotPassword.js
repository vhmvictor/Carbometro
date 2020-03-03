import React, { useState } from 'react'
import api from '../../services/api';
import { Redirect } from 'react-router';

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
            .catch(error => console.log(error))
    }

    if (redirect) {
        return <Redirect to="/reset_password" />
    }

    return (
        <div id="app">
            <aside>
                <h1>Insira o email de cadastro</h1>
                <p>Enviaremos um codigo de verificação em seu email</p>
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
            </aside>
        </div>
    )
}
    
export default ForgotPassword

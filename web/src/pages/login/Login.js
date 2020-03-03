import React, { useState } from 'react'
import api from '../../services/api'

import './Login.css'
import { login } from '../../services/auth';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const Login = () => {

    const [users, setUsers] = useState([]); //controle
    const [email, setEmail] = useState(''); //variaveis
    const [password, setPassword] = useState(''); //variaveis
    const [redirect, setRedirect] = useState(false); //setar uma condição do redirect

    async function handleSubmit(e) {
        e.preventDefault()

        await api.post('/login', {
            email,
            password
        })
            .then(response => {
                login(response.data.token) //setando localStore=token
                setUsers([...users, response.data]); //controle de acesso
                setRedirect(true)
                console.log(response)
            })
            .catch(error => console.log(error))

        setEmail('');
        setPassword('');
    }

    if (redirect) {
        return <Redirect to="/home" />
    }

    return (
        <div id="app">
            <aside>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            placeholder="Email *"
                            className="Login-Field"
                            name="email"
                            id="email"
                            required value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Password *"
                            className="Login-Field"
                            name="password"
                            id="password"
                            required value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="Login-Btn" type="submit">Entrar</button>
                </form>
                <Link className="forgot_password" to="/forgot_password">
                    <p>Esqueci minha senha</p>
                </Link>
            </aside>
        </div>
    )
}


export default Login

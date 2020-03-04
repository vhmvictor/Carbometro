import React, { useState } from 'react'
import api from '../../services/api'

import ReactDOM from 'react-dom';

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
            .catch(error => {
                console.log(error);

                const element = <div className="alert-alert-danger" role="alert">
                    Email ou senha incorreto!
                                </div>

                ReactDOM.render(element, document.getElementById("boot"));
            })

        setEmail('');
        setPassword('');
    }

    if (redirect) {
        return <Redirect to="/home" />
    }

    return (
        <>
            <header className="Login-header">
                <div className="Carb-title">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1>Carbometro</h1>
                    </Link>
                </div>
            </header>
            <div className="Login">
                <div className="Login-title">
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div id="boot">
                    </div>
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
                    <div className="forgot_password">
                        <button className="Login-Btn" type="submit">Entrar</button>
                        <Link to="/forgot_password" style={{ color: 'white' }}>
                            <p>Esqueci minha senha</p>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}


export default Login

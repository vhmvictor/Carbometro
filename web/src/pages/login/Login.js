import React from 'react';
import { Link } from 'react-router-dom'

import { ErrorMessage, Formik, Form, Field } from 'formik' 
import * as yup from 'yup'; 
import axios from 'axios';

import { history } from '../../history'
import './Login.css';

const Login = () => {
    const handleSubmit = values => {
        axios.post('http://localhost:3333/auth/authenticate', values)
            .then(response => { //esqueça a ação e executa o comando de redirecionamento
                const { data } = response
                if(data) {
                    console.log(data);
                    localStorage.setItem('app-token', data);
                    history.push('/');
                }
            })
    }
    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
    })
    return (
        <>
            <h1>Login</h1>
            <p>Fill the fields to continue</p>
            <Formik 
                initialValues={{}} 
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="Login">
                    <div className="Login-Group">
                        <Field //input
                            name="email" 
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="email" 
                            className="Login-Error"
                        />
                    </div>
                    <div className="Login-Group">
                        <Field //input
                            name="password" 
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="password" 
                            className="Login-Error"
                        />
                    </div>
                    <div className="Button-Page">
                        <div className="Link-ResetPassword">
                            <Link className="Reset-Text" to="/ForgotPassword" style={{ textDecoration: 'none' }}>Forgot Password</Link>
                        </div>
                        <div className="Button-Login">
                            <button className="Login-Btn" type="submit">Login</button>
                        </div>
                        <div className="Button-Register">
                            <Link className="Register-link" to="/register" style={{ textDecoration: 'none' }}>Create new acount</Link>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default Login;
import React from 'react';

import { ErrorMessage, Formik, Form, Field } from 'formik' 
import * as yup from 'yup'; 
import axios from 'axios';

import { history } from '../../history'
import '../login/Login.css';

const ResetPassword = () => {
    const handleSubmit = values => {
        axios.post('http://localhost:3333/auth/reset_password', values)
            .then(response => { //esqueça a ação e executa o comando de redirecionamento
                history.push('/login')
            })
    }
    const validations = yup.object().shape({
        email: yup.string().email().required(),
        token: yup.string().min(6).required(),
        password: yup.string().min(8).required()
    })
    return (
        <>
            <h1>Reset Password</h1>
            <p>Fill the fields to create a new Password</p>
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
                            name="token" 
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="token" 
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
                    <button className="Login-Btn" type="submit">Send</button>
                </Form>
            </Formik>
        </>
    )
}

export default ResetPassword;
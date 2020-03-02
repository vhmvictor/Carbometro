import React from 'react';

import { ErrorMessage, Formik, Form, Field } from 'formik' 
import * as yup from 'yup'; 
import axios from 'axios';

import { history } from '../../history'
import '../login/Login.css';

const ForgotPassword = () => {
    const handleSubmit = values => {
        axios.post('http://localhost:3333/auth/forgot_password', values)
            .then(response => { //esqueça a ação e executa o comando de redirecionamento
                history.push('/ResetPassword')
            })
    }
    const validations = yup.object().shape({
        email: yup.string().email().required()
    })
    return (
        <>
            <h1>Forgot Password</h1>
            <p>Fill the email field to send validation token</p>
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
                    <button className="Login-Btn" type="submit">Send</button>
                </Form>
            </Formik>
        </>
    )
}

export default ForgotPassword;
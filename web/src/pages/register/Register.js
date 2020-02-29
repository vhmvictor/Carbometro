import React from 'react';

import { ErrorMessage, Formik, Form, Field } from 'formik' 
import * as yup from 'yup'; 
import axios from 'axios';

import { history } from '../../history'
import '../login/Login.css';

const Register = () => {
    const handleSubmit = values => {
        axios.post('http://localhost:3333/auth/register', values)
            .then(response => {
                const { data } = response
                if(data) {
                    console.log(data);
                    history.push('/login')
                }
            })
    }
    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
    })
    return (
        <>
            <h1>Register</h1>
            <p>Fill the fields to create a new user</p>
            <Formik 
                initialValues={{}} 
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="Login">
                    <div className="Login-Group">
                        <Field //input
                            name="name" 
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="name" 
                            className="Login-Error"
                        />
                    </div>
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
                    <button className="Login-Btn" type="submit">Register</button>
                </Form>
            </Formik>
        </>
    )
}

export default Register;
import React, { useState, useEffect } from 'react'
import { logout } from '../../services/auth'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { getId } from '../../services/auth';

import { AddItem } from '../components/addItem/AddItem'
import { ModalItem } from '../components/modalItem/ModalItem'

const AddGlucoses = () => {
    
    const [foods, setFoods] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        async function handleLoadFoods() {
    
            const id = getId();
    
            await api.get(`/user/searchAddFoods/${id}`)
                .then(response => {
                    const food = response.data.addFoods
                    console.log(food)
                    setFoods(food);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    
        handleLoadFoods()
    
        },[])

    async function handleLogout(e) {
        e.preventDefault()

        logout();

        setRedirect(true);
    }

    if (redirect) return <Redirect to="/login" />

    return (
        <>
            <header className="Logged-header">
                <div className="Carb-title">
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                        <h1>Carbometro</h1>
                    </Link>
                </div>
                <div className="Btn-logged-header">
                    <button className="Btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                    <button className="Btn-config" onClick={handleShow}>
                        <i className="material-icons" >build</i>
                    </button>
                    <div>
                        <ModalItem
                            show={show}
                            setShow={setShow}
                            handleClose={handleClose}
                        />
                    </div>
                </div>
            </header>
            <div>
                {
                <AddItem
                    glucose={foods}
                />
                }
            </div>
        </>
    )
}

export default AddGlucoses

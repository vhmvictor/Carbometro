import React from 'react';

import Logout from '../components/Logout';

import '../login/Login.css';

const Home = () => {
    async function handleLogout(e) {
        e.preventDefault();
        Logout();
    }
    return (
        <>
            <h1>Home</h1>
            <p>Welkome to Carbometro!</p>
            
            <div>
                <button className="Login-Btn" onClick={handleLogout}>Logout</button>
            </div>
        </>
    )
}

export default Home;
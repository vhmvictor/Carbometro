import React from 'react';

import { Route, Redirect } from 'react-router'

const PrivateRoute = props => {
    const isLogged = !!localStorage.getItem('app-token'); //criando rotas privadas. Sómente terá acesso a rota se "app-token" existir, logo está autenticado
    return isLogged ? <Route {...props}/> : <Redirect to="/login"/>
} 

export default PrivateRoute
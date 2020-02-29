import React from 'react';

import { Router, Switch, Route } from "react-router-dom"

import Login from '../pages/login';
import Register from '../pages/register';
import Home from '../pages/home';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';

import { history } from '../history' //navegação entre as rotas

const Routes = () => (
    <Router history={history}>
        <Switch>
           <Route component={Login} exact path="/Login"/>
           <Route component={Register} exact path="/Register"/>
           <PrivateRoute component={Home} exact path="/"/>
           <PrivateRoute component={NotFound}/>
        </Switch>
    </Router>
)

export default Routes;
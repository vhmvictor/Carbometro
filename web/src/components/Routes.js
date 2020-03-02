import React from 'react';

import { Router, Switch, Route } from "react-router-dom"

import Home from '../pages/home';
import Register from '../pages/register';
import Login from '../pages/login';
import ForgotPassword from '../pages/forgotPassword';
import ResetPassword from '../pages/resetPassword';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';

import { history } from '../history' //navegação entre as rotas

const Routes = () => (
    <Router history={history}>
        <Switch>
           <Route component={Register} exact path="/Register"/>
           <Route component={Login} exact path="/Login"/>
           <Route component={ForgotPassword} exact path="/ForgotPassword"/>
           <Route component={ResetPassword} exact path="/ResetPassword"/>
           <PrivateRoute component={Home} exact path="/"/>
           <PrivateRoute component={NotFound}/>
        </Switch>
    </Router>
)

export default Routes;
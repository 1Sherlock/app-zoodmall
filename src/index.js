import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/new.scss";
import Home from "./New";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import NotFound from "./NotFound";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/:userId/:transactionId" exact component={Home}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

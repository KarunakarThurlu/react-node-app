import React from 'react'
import { Route, } from "react-router-dom";
import Login from "../LoginComponent/Login";

const PrivateRoute = (props) => {
    return (
        <Route {...props} >
               { localStorage.getItem("isAuthenticated") === "true" && localStorage.getItem("loginDate") ===new Date().toDateString() ? props.children: <Login />}
        </Route>
    )
}

export default PrivateRoute

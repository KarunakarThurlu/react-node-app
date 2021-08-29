import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core'
import MenuIcon from "@material-ui/icons/Menu"
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import config from "../ApiCalls/Config";
import { withRouter } from "react-router-dom";

import "./navbar.css";
import Notifier from '../Utils/Notifier';
import Sidebar from './Sidebar';

function NavBar(props) {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isAdmin,setIsAdmin]=useState(false);


    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        config.LOCAL_FORAGE.removeItem("token");
        localStorage.clear();
        props.history.push("/signin");
        Notifier.notify("You are Logged out  Successfully!.", Notifier.notificationType.SUCCESS);
        //window.location.href = "/signin"
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

   const handleMenuClick = () =>{
    setSidebarOpen(true)
    setIsAdmin(localStorage.getItem("isAdmin"));
   }
    return (
        <div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={anchorEl}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
            <AppBar title="Java Quiz Application" variant="elevation" className="nav-bar">
                <Toolbar>
                    <IconButton onClick={handleMenuClick} >
                        <MenuIcon style={{ color: "white", fontSize: "2.5rem" }} />
                    </IconButton>
                    <Typography variant="h6" >
                        Java Quiz Appliocation
                    </Typography>
                    <AccountCircleSharpIcon onClick={handleClick} style={{ color: "white", fontSize: "2.5rem" }} />
                </Toolbar>
            </AppBar>
            <Sidebar open={sidebarOpen} isAdmin={isAdmin} onHide={() => setSidebarOpen(false)} />
        </div>
    )
}

export default withRouter(NavBar)

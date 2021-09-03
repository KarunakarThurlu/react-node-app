import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom"
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';



function Sidebar(props) {

    return (
        <div className="sidebar">
            <Drawer variant="persistent"
                anchor="left" openSecondary={true} open={props.open} >
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", height: "4.0em", backgroundColor: "hsl(231deg 48% 48%)" }}>
                    <IconButton onClick={props.onHide} ><CloseIcon style={{ color: "white", fontSize: "2.5rem" }} /></IconButton>
                </div>
                <Divider />
                <MenuItem onClick={props.onHide} >
                    <Link to="/dashboard" className="MuiMenuItem-root-sidebar">Dashboard</Link>
                </MenuItem>
                <MenuItem onClick={props.onHide}>
                    <Link to="/writeexam" className="MuiMenuItem-root-sidebar">WriteExam</Link>
                </MenuItem>
                <MenuItem onClick={props.onHide}>
                    <Link to="/addquestion" className="MuiMenuItem-root-sidebar">Add Question</Link>
                </MenuItem>
                {props.isAdmin==="true"?
                <>
                <MenuItem onClick={props.onHide} >
                    <Link to="/submitquestion" className="MuiMenuItem-root-sidebar">Questions</Link>
                </MenuItem>
                <MenuItem onClick={props.onHide}>
                    <Link to="/manageusers" className="MuiMenuItem-root-sidebar">Users</Link>
                </MenuItem>
                <MenuItem onClick={props.onHide}>
                    <Link to="/topic" className="MuiMenuItem-root-sidebar">Topics</Link>
                </MenuItem>
                <MenuItem onClick={props.onHide}>
                    <Link to="/manageusers" className="MuiMenuItem-root-sidebar">Exams</Link>
                </MenuItem>
                </>:""}
            </Drawer>
        </div>
    )
}

export default Sidebar

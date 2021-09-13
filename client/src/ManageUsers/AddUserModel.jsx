import React, { useContext, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import "./manageusers.scss";
import { set } from 'mongoose';

function AddUserModel(props) {

    //const { saveUser } = useContext(UserContext);

    const [data,setData]=useState({name:'',email:'',phoneNumber:'',gender:'',roles:[]})
    const [errors,setErrors]=useState({name:'',email:'',phoneNumber:'',gender:'',roles:[]})
    
    
    const onSubmit = (data) => {


    };

    const handleChange=(e)=>{
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
    }
    const roles = ["USER", "ADMIN"];

    return (
        <div className="AddUser-Model">
            <Dialog className="MuiDialog-paper-AddUserModel"
                open={props.open}
                onClose={props.onClose}
            >
                <MuiDialogTitle>
                    <AccountCircleIcon style={{ fontSize: 40 }} />
                </MuiDialogTitle>
                <DialogContent>
                    
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Name"
                        type="text"
                        name="name"
                        onChange={handleChange}
                    />
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Phono"
                        type="text"
                        name="phono"
                        onChange={handleChange}
                    />
                    
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="email"
                        onChange={handleChange}
                    />
                    
                    <div className="secondRow">
                    <FormControl variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
                        <Select
                            native
                            label="Gender"
                            name="gender"
                            onChange={handleChange}
                        >
                            <option aria-label="None" value="" />
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                        </Select>
                    </FormControl>
                    <Autocomplete
                        multiple
                        options={[{ role_name: "USER" }, { role_name: "ADMIN" }]}
                        getOptionLabel={(option) => option.role_name}
                        onChange={handleChange}
                        filterSelectedOptions
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="SelectRoles"
                                placeholder="Roles"
                                margin="normal"
                            />
                        )}
                    />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained" className="addUserButton" color="primary">AddUser</Button>
                    <Button onClick={props.onClose} variant="contained" color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddUserModel

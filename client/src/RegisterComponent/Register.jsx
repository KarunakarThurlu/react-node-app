import React, { useContext, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

import "./register.css";
import SignupApi from '../ApiCalls/SignupApiCall';
import UserContext from "../Context/UserContext/UserContext";

function Register(props) {

    const [user, setUser] = useState();

    const { saveUser } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = (data) => {

        saveUser(data);
        SignupApi.signUp(data)
            .then(response => {
                if (response.data.statusCode === 200) {
                    //saveUser(response.data.data)
                }
            })
            .catch(error => {

            });
        
    };

    return (
        <div className="signup">
            <form onSubmit={handleSubmit(onSubmit)}>
                <AccountCircleIcon style={{ fontSize: 40 }} />
                <div className="form-fields">
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Name"
                        type="text"
                        name="name"
                        {...register("name", { required: "User name is required" })}
                    />
                    <br />
                    {errors.name && <span className="Error-Message">{errors.name.message}</span>}
                    <br />
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Phono"
                        type="text"
                        name="phono"
                        {...register("phono", { required: "User phono is required" })}
                    />
                    <br />
                    {errors.phono && <span className="Error-Message">{errors.phono.message}</span>}
                    <br />
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    <br />
                    {errors.email && <span className="Error-Message">{errors.email.message}</span>}
                    <br />
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Password"
                        type="password"
                        name="password"
                        {...register("password", { required: "Password is required" })}
                    />
                    <br />
                    {errors.password && <span className="Error-Message">{errors.password.message}</span>}
                </div>
                <br />
                <div className="form-button">
                    <Button type="submit" variant="contained" color="primary">SignUp</Button>
                </div>
            </form>
            <div className="questions">
                <Link to="/signin"><h4 className="questions-text" >Alredy have account?</h4></Link>  <Link to="/forgotpassword"><h4 className="questions-text">Forgot Password?</h4></Link>
            </div>

        </div>
    )
}

export default Register

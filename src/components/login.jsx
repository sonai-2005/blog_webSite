import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin, logout } from "../store/authSlice"
import { Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { registor, handlesubmit } = useForm();
    const [error, setError] = useState("");
    const Login = async (data) => {
        setError("");
        try {
            const session = await authService.logIn(data.email, data.password);
            if (session) {
                const userData = await authService.GetCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div>Login</div>
    )
}

export default Login
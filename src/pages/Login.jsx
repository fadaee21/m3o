import { Alert, Button, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
const m3o = require("m3o").default("NWE4NzYxZWYtNjliNy00YjQwLTg2YmEtZDFjOTkzYmU1OTk2")

const Login = () => {
    const [inputValue, setInputValue] = useState({
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState("")

    const { toggle } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValue((prevValue => ({ ...prevValue, [name]: value })))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        userLogin()
    }

    const userLogin = async () => {
        try {
            const m3oAccount = await m3o.user.login({
                email: inputValue.email,
                password: inputValue.password,
            });
            if (m3oAccount['session']) {
                console.log(m3oAccount)
                toggle()
                navigate('/clock')
            }
        } catch (error) {
            setErrorMessage((error['detail']))
        }
    }
    useEffect(() => {
        setErrorMessage("")
    }, [inputValue])


    return (
        <Container>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    id="outlined-required"
                    label="email"
                    onChange={handleChange}
                    name='email'
                    sx={{ p: 1 }}
                    data-testid='emailTest'
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    name='password'
                    sx={{ p: 1 }}
                    data-testid='passwordTest'
                />
                <Button variant='contained' type='submit' sx={{ display: 'block', m: 2 }} >Login</Button>
                {errorMessage &&  <Alert severity="error" variant="outlined">{errorMessage}</Alert>}
            </form>
            <h6>username: joe@example.com</h6>
            <h6>password: Password1</h6>
        </Container>
    )
}

export default Login
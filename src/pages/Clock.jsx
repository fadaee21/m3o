import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const Clock = () => {
    const { userAuth, toggle } = useAuth()
    const [time, setTime] = useState(new Date().toLocaleTimeString())


    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000);

        return () => {
            clearInterval(timer)
        }
    }, [time])

    if (!userAuth.loggedIn) {
        return <Navigate to='/' />
    }

    return (

        <>
            <h1 >
                TIME: {time}
            </h1>
            <Button variant="contained" color='warning'
             onClick={toggle}
            >Logout</Button>
        </>

    )
}

export default Clock
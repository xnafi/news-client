import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const loaction = useLocation()
    if (loading) {
        return <>loading....</>
    }

    if (user) {
        return children
    } else {
        return <Navigate to='/login' state={{ from: loaction }} replace></Navigate>
    }
}

export default PrivateRoute
import { Navigate, useLocation,Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUser } from '../features/User/userSlice'
import { useState } from 'react'
const PrivateRoutes = ({ children }) => {
    const token = localStorage.getItem('token')
    const location = useLocation()
    return token ? children :  (
        <Navigate to="/signin" replace state={{ from: location }} ></Navigate>
    )
}

export default PrivateRoutes

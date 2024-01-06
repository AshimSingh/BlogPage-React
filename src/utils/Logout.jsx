import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import SpinLoading from '../components/SpinLoading'

const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
}
const Logout = () => {
    useEffect(() => {
        logout()
    }, [])
    const [redirect, setRedirect] = useState(false)
    return (
        <>
            <SpinLoading></SpinLoading>
            {setTimeout(() => {
                setRedirect(true)
            }, 3000)}
            {redirect ? <Navigate to="/" /> : null}
        </>
    )
}
export default Logout

import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className="flex flex-col">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout

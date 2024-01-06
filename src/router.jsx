import MainLayout from './layout/mainLayout'
import HomePage from './pages/homePage'
import BlogPage from './pages/blogPage'
import SignInPage from './pages/signInPage'
import EditUserPage from './pages/EditUserPage'
import {
    createBrowserRouter,
    // RouterProvider,
    // Route,
    // Link,
} from 'react-router-dom'
import SignUpPage from './pages/signUpPage'
import SearchPage from './pages/searchPage'
import SingleBlogPage from './pages/SingleBlogPage'
import UserPage from './pages/userPage'
import CategoryPage from './pages/categoryPage'
import DashboardPage from './pages/DashboardPage'
import PrivateRoutes from './ProtectedRoutes'
import CategoryList from './components/CategoryList'
import Logout from './utils/Logout'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <BlogPage />,
            },
            {
                path: 'blogs',
                element: <BlogPage />,
                // children: [
                //     {
                //         path: ':slug',
                //         element: <SingleBlogPage />,
                //     },
                // ],
            },
            {
                path:'editprofile',
                element:<PrivateRoutes>
                    <EditUserPage />
                </PrivateRoutes>
            },
            {
                path: 'categories',
                element: <CategoryList />,
            },
            {
                path: 'blogs/:slug',
                element: <SingleBlogPage />,
            },
            {
                path: 'user/:slug',
                element: <UserPage />,
            },
            {
                path: 'search',
                element: <SearchPage />,
            },
            {
                path: 'category/:slug',
                element: <CategoryPage />,
            },
        ],
    },
    {
        path: '/logout',
        element: <Logout />,
    },
    {
        path: '/signin',
        element: <SignInPage />,
    },
    {
        path: '/signup',
        element: <SignUpPage />,
    },
    {
        path: '/dashboard',
        element: (
            // <DashboardPage>

            // </DashboardPage>
            <PrivateRoutes>
                <DashboardPage />
            </PrivateRoutes>
        ),
    },
])
export default router

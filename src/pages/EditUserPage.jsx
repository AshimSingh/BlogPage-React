import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../features/User/userSlice'
import UserPageLayout from '../components/UserPageLayout'
import {
    fetchBlogs,
    selectAllBlogs,
} from '../features/Blog/blogSlice'
import SpinLoading from '../components/SpinLoading'

const EditUserPage = () => {
    const dispatch = useDispatch()
    const blogCount = useSelector((state) => state.blogs.totalCount)
    const blogStatus = useSelector((state) => state.blogs.status)
    const userId = localStorage.getItem('userId')
    const userData = useSelector((state) => state.user.data)
    const blogData = useSelector((state) => state.blogs.data)
    useEffect(() => {
        if (userId) {
            dispatch(fetchUser({ url: `/users/${userId}` }))
            if (blogStatus === 'idle') {
                dispatch(
                    fetchBlogs({
                        url: `/blogs/?searchby=author&&search=${userId}`,
                        limit: '10',
                    })
                )
            }
        }
    }, [userId])
    return (
        <div className="w-full h-full">
            {userData ? (
                <UserPageLayout
                    userData={userData}
                    blogData={blogData}
                    blogCount={blogCount}
                    blogStatus={blogStatus}
                    isDashBoardComponent={true}
                />
            ) : (
                <SpinLoading />
            )}
        </div>
    )
}

export default EditUserPage

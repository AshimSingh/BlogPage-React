import { useEffect } from 'react'
import {
    fetchBlogs,
    selectAllBlogs,
} from '../features/Blog/blogSlice'
import { fetchOtherUser } from '../features/User/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Empty } from 'antd'
import UserPageLayout from '../components/UserPageLayout'

const UserPage = () => {
    return <UserDetails />
}

const UserDetails = () => {
    var { slug } = useParams()
    const dispatch = useDispatch()
    const blogStatus = useSelector((state) => state.blogs.status)
    const blogError = useSelector((state) => state.error)
    const blogCount = useSelector((state) => state.blogs.totalCount)
    const blogData = useSelector(selectAllBlogs)
    const userData = useSelector((state) => state.user.otherUserData)
    useEffect(() => {
        dispatch(fetchOtherUser({ url: `/users/${slug}` }))
    }, [slug, dispatch])
    useEffect(() => {
        if (userData) {
            dispatch(
                fetchBlogs({
                    url: `/blogs/?searchby=author&&search=${userData?._id}`,
                    limit: '10',
                })
            )
        }
    }, [userData, dispatch])
    return (
        <>
            {userData && blogData ? (
                <UserPageLayout
                    userData={userData}
                    blogData={blogData}
                    blogCount={blogCount}
                    blogError={blogError}
                    blogStatus={blogStatus}
                    isDashBoardComponent={false}
                    // usersData={usersData}
                />
            ) : (
                <Empty></Empty>
            )}
        </>
    )
}

export default UserPage

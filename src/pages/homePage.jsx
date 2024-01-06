import BlogList from '../components/BlogList'
// import { Login } from '../features/Authentication/AuthenticationSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import HomeLayout from '../layout/homeLayout'
import PageInition from '../components/pageInition'
import {
    selectAllBlogs,
    fetchBlogs,
} from '../features/Blog/blogSlice'
import Sidebar from '../components/Sidebar'
import {
    getCategories,
    selectAllCategories,
} from '../features/Categories/categoriesSlice'

const HomePage = () => {
    const data = useSelector(selectAllBlogs)
    const blogsStatus = useSelector((state) => state.blogs.status)
    const categoriesStatus = useSelector(
        (state) => state.categories.status
    )
    const categoriesData = useSelector(selectAllCategories)
    const error = useSelector((state) => state.blogs.error)
    const dispatch = useDispatch()

    useEffect(() => {
        if (blogsStatus == 'idle') {
            dispatch(fetchBlogs({}))
        }
        if (categoriesStatus == 'idle') {
            dispatch(getCategories())
        }
    }, [blogsStatus, dispatch, categoriesStatus])
    const onPageInitionChange = (page, pageSize) => {
        console.log(page, pageSize)
        dispatch(fetchBlogs({ limit: pageSize, page }))
    }
    const totalCount = useSelector((state) => state.blogs.totalCount)
    const currentPage = useSelector(
        (state) => state.blogs.currentPage
    )
    const contentComponents = [
        <BlogList
            key={1}
            data={data}
            status={blogsStatus}
            error={error}
        />,
        <PageInition
            key={2}
            currentPage={currentPage}
            totalCount={totalCount}
            onPageInitionChange={onPageInitionChange}
        />,
    ]
    const sideBarComponents = [
        <Sidebar
            data={categoriesData}
            status={categoriesStatus}
            heading={'Similar Intrest'}
            key={1}
        />,
    ]

    return (
        <>
            <HomeLayout
                contentComponent={contentComponents}
                sideBarComponent={sideBarComponents}
            ></HomeLayout>
        </>
    )
}

export default HomePage

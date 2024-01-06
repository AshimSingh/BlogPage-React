import FeaturedBlog from '../components/FeaturedBlog'
import BlogList from '../components/BlogList'
// import { Login } from '../features/Authentication/AuthenticationSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import HomeLayout from '../layout/homeLayout'
import PageInition from '../components/pageInition'
import {
    selectAllBlogs,
    fetchBlogs,
    fetchFeaturedBlog,
} from '../features/Blog/blogSlice'
import Sidebar from '../components/Sidebar'
import {
    getCategories,
    selectAllCategories,
} from '../features/Categories/categoriesSlice'

const BlogPage = () => {
    const data = useSelector(selectAllBlogs)
    const blogsStatus = useSelector((state) => state.blogs.status)
    const categoriesStatus = useSelector(
        (state) => state.categories.status
    )
    const categoriesData = useSelector(selectAllCategories)
    const error = useSelector((state) => state.blogs.error)
    const featuredListStatus = useSelector(
        (state) => state.blogs.featuredListStatus
    )
    const featuredList = useSelector(
        (state) => state.blogs.featuredList
    )
    const featuredListError = useSelector(
        (state) => state.blogs.featuredListError
    )
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchBlogs({}))

        dispatch(fetchFeaturedBlog())

        dispatch(
            getCategories({
                url: `blogs/categories?limit=9`,
            })
        )
    }, [])
    const onPageInitionChange = (page, pageSize) => {
        // console.log(page, pageSize)
        dispatch(fetchBlogs({ limit: pageSize, page }))
    }
    const totalCount = useSelector((state) => state.blogs.totalCount)
    const currentPage = useSelector(
        (state) => state.blogs.currentPage
    )
    const contentComponents = [
        <div
            key={3}
            className="flex justify-center flex-col items-center my-12"
        >
            <h1 className="font-mont font-black md:text-4xl text-2xl leading-normal">
                Our Blogs
            </h1>
        </div>,
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
            heading={'Categories You May Like'}
            key={1}
        />,
    ]
    return (
        <div className="h-full">
            <FeaturedBlog
                data={featuredList}
                status={featuredListStatus}
                error={featuredListError}
            />
            <HomeLayout
                contentComponent={contentComponents}
                sideBarComponent={sideBarComponents}
            ></HomeLayout>
        </div>
    )
}

export default BlogPage

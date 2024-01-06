import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import {
    selectAllBlogs,
    fetchBlogs,
    editBlog,
    deleteBlog,
} from '../features/Blog/blogSlice'
import DashboardFilter from '../components/DashBoardFilter'
import BlogList from '../components/BlogList'
import PageInition from '../components/pageInition'
import { Empty } from 'antd'
import {
    EditOutlined,
    EyeOutlined,
    DeleteOutlined,
} from '@ant-design/icons'
import ReactHtmlParser from 'react-html-parser'
import { Button, Table, Drawer } from 'antd'
import { Link } from 'react-router-dom'
import CategoryList from '../components/CategoryList'
import AddBlogForm from '../components/AddBlogForm'

const DashBoardPostPage = () => {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.blogs.status)
    const error = useSelector((state) => state.blogs.error)
    const currentPage = useSelector(
        (state) => state.blogs.currentPage
    )
    const totalCount = useSelector((state) => state.blogs.totalCount)
    const [searchQuery, setSearchQuery] = useState('')
    const [fromdate, setFromdate] = useState('')
    const [todate, setTodate] = useState('')
    const blogData = useSelector((state)=>state.blogs.data)
    const [view, setView] = useState('tableView')
    // search for is for feature to search for blog or for category which is discarded
    const [searchFor, setSearchFor] = useState('blog')
    const handelSearchForChange = (e) => {
        e.preventDefault()
        setSearchFor(e.target.value)
    }
    const handelViewChange = (newView) => {
        setView(newView)
    }
    useEffect(() => {
        if (fromdate || todate) {
            dispatch(
                fetchBlogs({
                    url: `blogs/authenticated_user_blogs?fromdate=${fromdate}&&todate=${todate}`,
                })
            )
        } 
        if (searchQuery.length>3) {
            // if (searchFor === 'blog') {
            dispatch(
                fetchBlogs({
                    url: `blogs/authenticated_user_blogs?fromdate=${fromdate}&&todate=${todate}&&search=${searchQuery}`,
                })
            )
            // }
        } 
        if(searchQuery.length==0 ||!fromdate ||!todate) {
            dispatch(
                fetchBlogs({ url: 'blogs/authenticated_user_blogs' })
            )
        }
    }, [fromdate, todate, searchQuery, searchFor])
    useEffect(()=>{
        console.log(blogData,'here')
    },[blogData])
    const handelDateChange = (date, dateString, dateInputName) => {
        if (dateInputName === 'from') {
            setFromdate(dateString)
        } else {
            setTodate(dateString)
        }
    }

    const onPageInitionChange = (page, pageSize) => {
        dispatch(
            fetchBlogs({
                url: `blogs/authenticated_user_blogs?limit=${pageSize}&&page=${page}`,
            })
        )
    }
    const onSearchBarChange = (e) => {
        e.preventDefault()
        setSearchQuery(e.target.value)
    }
    const categoryData = useSelector((state) => state.categories.data)
    const categoryStatus = useSelector(
        (state) => state.categories.status
    )
    return (
        <div className="w-full bg-gray-200 h-full  overflow-hidden">
            {searchFor === 'blog' ? (
                <>
                    <DashboardFilter
                        handelDateChange={handelDateChange}
                        view={view}
                        handelViewChange={handelViewChange}
                        onSearchBarChange={onSearchBarChange}
                        searchQuery={searchQuery}
                        handelSearchForChange={handelSearchForChange}
                    />
                    {view === 'cardView' ? (
                        <>
                            {blogData.length > 0 ? (
                                <BlogList
                                    data={blogData}
                                    status={status}
                                    error={error}
                                    isDashBoardComponent={true}
                                />
                            ) : (
                                <Empty />
                            )}
                            <div className="flex justify-center items-center my-3">
                                <PageInition
                                    key={2}
                                    currentPage={currentPage}
                                    totalCount={totalCount}
                                    onPageInitionChange={
                                        onPageInitionChange
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <TableData data={blogData} />
                            <div className="flex justify-end items-center p-4 mb-3">
                                <PageInition
                                    key={2}
                                    currentPage={currentPage}
                                    totalCount={totalCount}
                                    onPageInitionChange={
                                        onPageInitionChange
                                    }
                                />
                            </div>
                        </>
                    )}
                </>
            ) : (
                <CategoryList
                    data={categoryData}
                    status={categoryStatus}
                />
            )}
        </div>
    )
}

const TableData = () => {
    //for edit form
    const data = useSelector((state)=>state.blogs.data)
    useEffect(()=>{},[data])
    const [open, setOpen] = useState(false)
    const [dataToEdit, setDataToEdit] = useState({})
    const showDrawer = (data) => {
        setDataToEdit(data)
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '10%',
            render: (text, record) => (
                <>
                    <img
                        src={
                            record.thumbnail.image_url
                                ? record.thumbnail.image_url
                                : import.meta.env.VITE_DEFAULT_IMG
                        }
                        alt="Thumbnail"
                        style={{ width: '100px', height: 'auto' }} // Adjust the width and height as needed
                    />
                    <p className="text-xl font-medium">
                        {text.length > 30
                            ? text.slice(0, 30) + '...'
                            : text}
                    </p>
                </>
            ),

            //   ...getColumnSearchProps('title'),
            //   sorter: (a, b) => a.title.length - b.title.length,
            //   sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Excerpt',
            dataIndex: 'excerpt',
            key: 'excerpt',
            // width:20%,
            width: '20%',
            render: (text, record) => (
                <>
                    <h1>
                        {/* {text?.length > 30
                            ? ReactHtmlParser(text.slice(0, 60)) + '...'
                            : ReactHtmlParser(text)}{' '}
                        ... */}
                        {ReactHtmlParser(text).length > 30
                            ? ReactHtmlParser(text).slice(0, 10) +
                              ' ...'
                            : ReactHtmlParser(text)}
                    </h1>
                    {/* <div>{ ReactHtmlParser(text) }</div> */}
                    <div className="flex items-center my-2">
                        <h1 className="text-xl font-medium">
                            Category
                        </h1>
                        <h1 className="w-auto p-2 px-4 rounded-md my-2 bg-black text-white mx-2">
                            {record.categories.title}
                        </h1>
                    </div>
                </>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'thumbnail._id',
            width: '10%',
        },
        {
            title: 'Featured',
            dataIndex: 'featured',
            key: 'title',
            width: '5%',
            render: (text, record) => (
                <>
                    {text ? (
                        <>
                            <h1 className="text-green-500 text-sm">
                                Featured
                            </h1>
                            <h1>Priotiry No: {record.priority}</h1>
                        </>
                    ) : (
                        <h1 className="text-red-500 text-sm">
                            Not Featured
                        </h1>
                    )}
                </>
            ),
        },
        {
            title: 'Published',
            dataIndex: 'published',
            key: 'title',
            width: '5%',
            render: (text, record) => (
                <>
                    {record.published ? (
                        <>
                            <div className="w-[10px] h-[10px] bg-green-500 rounded-full"></div>
                            <div className="text-green-500">
                                Published
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-[10px] h-[10px] bg-red-500 rounded-full"></div>
                            <div className=" text-red-500 ">
                                Not Published
                            </div>
                        </>
                    )}
                </>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'published',
            key: 'title',
            width: '5%',
            render: (text, record) => (
                <div className="flex">
                    <EditOutlined
                        className="text-blue-500 text-[20px] mx-2"
                        onClick={() => {
                            showDrawer(record)
                        }}
                    />
                    <Link to={`/blogs/${record.slug}`}>
                        <EyeOutlined className="text-blue-500 text-[20px]" />
                    </Link>
                </div>
            ),
        },
    ]
    return (
        <div className="p-4 pb-1">
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{
                    x: 1000,
                }}
            />
            <EditBlog
                onClose={onClose}
                open={open}
                data={dataToEdit}
            />
        </div>
    )
}
export const EditBlog = ({ onClose, open, data }) => {
    const dispatch = useDispatch()
    const blogData = useSelector(selectAllBlogs)
    const editFunction = (formData) => {
        dispatch(editBlog({ data: formData, slug: data.slug }))
    }
    const [refresh,setRefresh] = useState(0)
    useEffect(()=>{},[refresh])
    const deleteFunction = () => {
        dispatch(
            deleteBlog({ slug: data.slug, author: data.author._id })   
        ) 
        setRefresh(refresh+1)
        onClose()
    }
    return (
        <Drawer
            title="Edit Blog"
            width={720}
            onClose={onClose}
            placement="right"
            open={open}
            styles={{
                body: {
                    paddingBottom: 80,
                    backgroundColor: 'gray',
                },
            }}
            extra={
                <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={deleteFunction}
                >
                    Delete
                </Button>
            }
        >
            <AddBlogForm
                onFinishFunction={editFunction}
                data={data}
            />
        </Drawer>
    )
}
export default DashBoardPostPage

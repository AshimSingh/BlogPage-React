import LoadingBox from './LoadingBox'
import { Link } from 'react-router-dom'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import {
    deleteCategory,
    editCategories,
    getCategories,
} from '../features/Categories/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import DashboardNavBar from './DashBoardNavBar'
import { Empty } from 'antd'
import {
    DeleteOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons'
import { Drawer, Form, Input, Button } from 'antd'
import AddCategoryForm, { CategoryForm } from './AddCategoryForm'
import PageInition from './pageInition'

const CategoryList = () => {
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('')
    const onSearchBarChange = (e) => {
        e.preventDefault()
        setSearchQuery(e.target.value)
    }
    const data = useSelector((state) => state.categories.data)
    const status = useSelector((state) => state.categories.status)
    useEffect(() => {
        if (!searchQuery) {
            dispatch(
                getCategories({
                    url: `blogs/categories?search=${searchQuery}&&limit=9`,
                })
            )
        }
        if (searchQuery) {
            dispatch(
                getCategories({
                    url: `blogs/categories?search=${searchQuery}&&limit=9`,
                })
            )
        }
    }, [dispatch, searchQuery])
    console.log(searchQuery)

    const [dataToEdit, setDataToEdit] = useState(null)

    //for edit
    const [open, setOpen] = useState(false)
    const onClose = () => {
        setOpen(false)
    }
    const showDrawer = (tempData) => {
        setDataToEdit(tempData)
        setOpen(true)
    }
    //for page inition
    const totalCount = useSelector(
        (state) => state.categories.totalCount
    )
    const currentPage = useSelector(
        (state) => state.categories.currentPage
    )
    const [pageSize, setPageSize] = useState(9)
    const onPageInitionChange = (page, pageSize) => {
        dispatch(
            getCategories({
                url: `/blogs/categories?page=${page}&&limit=${pageSize}`,
            })
        )
        setPageSize(pageSize)
    }
    let content
    if (status == 'succeeded' && data.length > 0) {
        content = data.map((m) => {
            var image = m.thumbnail?.image_url
            return (
                <div
                    key={m._id}
                    className="bg-white rounded min-w-[100px] lg:w-[350px] p-2 m-2"
                >
                    <img
                        src={
                            image
                                ? image
                                : import.meta.env.VITE_DEFAULT_IMG
                        }
                        className="object-fit w-full h-[200px]"
                    ></img>
                    <div>
                        <div className="flex justify-between">
                            <h1 className="text-2xl font-mono font-medium">
                                {m.title}
                            </h1>
                            <div className="flex">
                                <EditOutlined
                                    className="text-blue-500 text-[20px] mx-2"
                                    onClick={() =>
                                        showDrawer({ ...m })
                                    }
                                />
                                <Link to={`/category/${m.slug}`}>
                                    <EyeOutlined className="text-blue-500 text-[20px]" />
                                </Link>
                            </div>
                        </div>
                        <h2 className="text-sm">{m.description}</h2>
                    </div>
                </div>
            )
        })
    } else if (data.length === 0) {
        ;<Empty />
    } else {
        content = <LoadingBox />
    }

    return (
        <div className="w-full flex flex-col p-3 bg-gray-200 min-h-screen">
            <div className="lg:w-[30%] md:w-[50%] w-[90%]">
                <DashboardNavBar
                    onSearchBarChange={onSearchBarChange}
                    searchedQuery={searchQuery}
                />
            </div>
            <div className="flex  justify-center flex-wrap ">
                {content}
            </div>
            <EditCategory
                open={open}
                onClose={onClose}
                tempData={dataToEdit}
            />
            <div className="w-full flex justify-center">
                <PageInition
                    currentPage={currentPage}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onPageInitionChange={onPageInitionChange}
                />
            </div>
        </div>
    )
}

const EditCategory = ({ onClose, open, tempData }) => {
    const dispatch = useDispatch()
    const updateCategory = (values) => {
        console.log(tempData, 'this is tempdata')
        values.id = tempData._id
        console.log(values, tempData)
        dispatch(
            editCategories({ data: values, slug: tempData.slug })
        )
    }
    const onDelete = () => {
        onClose()
        dispatch(
            deleteCategory({ slug: tempData.slug, id: tempData._id })
        )
    }
    return (
        <>
            <Drawer
                title="Edit Image"
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
                        onClick={() => onDelete()}
                    >
                        Delete
                    </Button>
                }
            >
                <CategoryForm onFinishFunction={updateCategory} />
            </Drawer>
        </>
    )
}

export default CategoryList

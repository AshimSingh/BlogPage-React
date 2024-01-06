import { useEffect, useState } from 'react'
import DashboardNavBar from '../components/DashBoardNavBar'
import {
    CloudUploadOutlined,
    ReloadOutlined,
    InboxOutlined,
} from '@ant-design/icons'
import { Button, Modal, Upload, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
    getMedia,
    postMedia,
    selectAllMedia,
} from '../features/Media/mediaSlice'

import MediaList from '../components/MediaList'
import PageInition from '../components/pageInition'

const MediaPage = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const onSearchBarChange = (e) => {
        e.preventDefault()
        setSearchQuery(e.target.value)
    }
    const dispatch = useDispatch()

    useEffect(() => {
        if (searchQuery.length > 3) {
            dispatch(
                getMedia({
                    url: `/media?search=${searchQuery}&&limit=20`,
                })
            )
        }
        if (searchQuery.length === 0) {
            dispatch(getMedia({ url: `/media?limit=20` }))
        }
    }, [searchQuery])
    const [imageSelected, setImageSelected] = useState(false)

    const totalCount = useSelector((state) => state.media.totalCount)
    const currentPage = useSelector(
        (state) => state.media.currentPage
    )
    const [pageSize, setPageSize] = useState(20)
    const onPageInitionChange = (page, pageSize) => {
        dispatch(
            getMedia({
                url: `/media?page=${page}&&limit=${pageSize}`,
            })
        )
        setPageSize(pageSize)
    }

    return (
        <div className=" w-full bg-gray-200 flex flex-col items-center">
            <div className="w-[95%] lg:w-[90%]  flex  justify-between items-center flex-wrap">
                <h1 className="md:text-4xl text-xl  font-popins my-3 font-bold ">
                    My Uploads
                </h1>

                <div className="md:w-[30%] w-full h-[40px] ">
                    <DashboardNavBar
                        searchQuery={searchQuery}
                        onSearchBarChange={onSearchBarChange}
                    />
                </div>
            </div>
            <div className="w-[95%]  lg:w-[90%] min-h-screen bg-white rounded-md flex flex-col  my-5">
                <MediaUploadMainContainer
                    imageSelected={imageSelected}
                />
                <div className="w-full flex justify-center items-center">
                    <PageInition
                        currentPage={currentPage}
                        totalCount={totalCount}
                        pageSize={pageSize}
                        onPageInitionChange={onPageInitionChange}
                    />
                </div>
            </div>
        </div>
    )
}

//dragger
const { Dragger } = Upload
// const props = {
//     name: 'file',
//     //    multiple: false,
//     // action: '/media',
//     onChange(info) {
//         const { status } = info.file
//         if (status !== 'uploading') {
//             console.log(info.file, info.fileList)
//         }
//         if (status === 'done') {
//             message.success(
//                 `${info.file.name} file is ready to upload.`
//             )
//         } else if (status === 'error') {
//             message.error(`${info.file.name} file upload failed.`)
//         }
//     },
//     onDrop(e) {
//         console.log('Dropped files', e.dataTransfer.files)
//     },
// }

const MediaUploadMainContainer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const dispatch = useDispatch()
    const mediaData = useSelector(selectAllMedia)
    const mediaStatus = useSelector((state) => state.media.status)
    useEffect(() => {
        dispatch(getMedia({}))
    }, [])

    // props for media upload
    // const [filePath, setFilePath] = useState({})
    // const [uploading, setUploading] = useState(false)
    // const formData = new FormData()
    // const handleUpload = () => {
    //     formData.append('path', filePath)
    //     setUploading(true)
    //     var resp = dispatch(postMedia({ data: formData }))

    //     setUploading(false)

    //     handleCancel()
    //     setFilePath({})
    // }

    const [filePath, setFilePath] = useState('')
    const [fileList, setFileList] = useState([])
    const [uploading, setUploading] = useState(false)
    const handleUpload = () => {
        console.log('hello ', filePath)
        const formData = new FormData()
        // fileList.forEach((file) => {
        //     formData.append('files[]', file)
        // })
        formData.append('path', filePath)
        var resp = dispatch(postMedia({ data: formData }))
        setUploading(true)
        setFileList([])
        setFilePath('')
        setUploading(false)
    }
    const props = {
        multiple: false,
        accept: '.jpg, .jpeg, .png',
        onRemove: (file) => {
            const index = fileList.indexOf(file)
            const newFileList = fileList.slice()
            newFileList.splice(index, 1)
            setFileList(newFileList)
            setFilePath('')
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file])
            setFilePath(file)
            return false
        },
        // filePath,
        fileList,
    }

    const onRefresh = () => {
        dispatch(getMedia({}))
    }
    return (
        <>
            <div className={'col-span-12 md:p-4 py-3 p-1'}>
                {/* upload button and refresh button */}
                <div className="w-full">
                    <button
                        className="md:text-xl text-sm text-white bg-blue-500 rounded-md font-bold hover:bg-blue-700 p-2 px-4 m-2"
                        onClick={showModal}
                    >
                        <CloudUploadOutlined className="text-white font-[20px]" />{' '}
                        Upload
                    </button>
                    <button
                        className="md:text-xl text-sm text-white bg-red-500 rounded-md font-bold hover:bg-red-700 p-2 px-4 m-2"
                        onClick={onRefresh}
                    >
                        <ReloadOutlined className="text-white font-[20px]" />{' '}
                        Refresh
                    </button>
                    <Modal
                        title="Upload "
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button
                                key={'upload'}
                                className="text-sm text-white bg-blue-500 rounded-md font-bold  p-1 px-2"
                                onClick={handleUpload}
                                disabled={filePath?.name === ''}
                                loading={uploading}
                                style={{
                                    marginTop: 16,
                                }}
                            >
                                <CloudUploadOutlined className="text-white font-[20px]" />{' '}
                                Upload
                            </Button>,
                            // <Button
                            //     type="primary"
                            //     key={'back'}
                            //     onClick={handleCancel}
                            //     danger
                            // >
                            //     Cancle
                            // </Button>,
                        ]}
                    >
                        {/* <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to
                                upload
                            </p>
                            <p className="ant-upload-hint">
                                Support only single upload.File type
                                must be JPEG/JPG/PNG. To edit/delete
                                uploaded image click on particular
                                image.
                            </p>
                        </Dragger>  */}

                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to
                                upload
                            </p>
                            <p className="ant-upload-hint">
                                Support only single upload.File type
                                must be JPEG/JPG/PNG. To edit/delete
                                uploaded image click on particular
                                image.
                            </p>
                        </Dragger>
                    </Modal>
                </div>
                <MediaList data={mediaData} status={mediaStatus} />
            </div>
        </>
    )
}

export default MediaPage

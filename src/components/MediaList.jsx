import { useEffect, useState } from 'react'
import { Button, Empty, Image } from 'antd'
import { Drawer, Form, Input } from 'antd'
import LoadingBox from './LoadingBox'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMedia, editMedia } from '../features/Media/mediaSlice'
import { message } from 'antd'
import {
    DeleteOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons'

const MediaList = ({ isSelectMediaComponent = false, setMedia }) => {
    const [modalContent, setModalContent] = useState({})
    const [open, setOpen] = useState(false)
    const data = useSelector((state) => state.media.data)
    const status = useSelector((state) => state.media.status)
    const showDrawer = (modalData) => {
        setModalContent(modalData)
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }
    const dispatch = useDispatch()
    const onDelete = (data) => {
        dispatch(deleteMedia({ id: data._id }))
        setOpen(false)
    }
    const [showBorderOnSelect, setBorderOnSelect] = useState(false)
    const [selectedData, setSelectedData] = useState({})
    const onSelect = (data) => {
        setBorderOnSelect(!showBorderOnSelect)
        setSelectedData(data)
        console.log('selected data', selectedData, data)
        {
            showBorderOnSelect ? setMedia('') : setMedia(data)
        }
    }
    useEffect(() => {}, [data])

    let content
    if (status === 'loading') {
        content = <LoadingBox />
    } else if (status == 'succeeded' && data) {
        content = (
            <>
                {data.map((info) => {
                    var image = info?.image_url
                    return (
                        <>
                            <div
                                key={info._id}
                                className={`md:shadow-2xl shadow-sm  m-2  flex flex-col justify-center items-center hover:bg-gray-200 p-2 rounded-xl text-gray-700 hover:text-blue-500 cursor-pointer md:w-[200px] w-full relative ${
                                    showBorderOnSelect &
                                    (info._id === selectedData._id)
                                        ? 'border-2 border-blue-500 '
                                        : ''
                                }`}
                                onClick={() => {
                                    if (isSelectMediaComponent) {
                                        onSelect({ ...info })
                                    } else {
                                        showDrawer({ ...info })
                                    }
                                }}
                            >
                                <div
                                    className={`absolute -top-1 -right-2 bg-white z-9 rounded-full' ${
                                        showBorderOnSelect &
                                        (info._id ===
                                            selectedData._id)
                                            ? 'absolute rounded-full'
                                            : 'hidden'
                                    } `}
                                    style={{ zIndex: 10 }}
                                >
                                    <CheckCircleOutlined className="text-blue-500 text-2xl" />
                                </div>
                                <Image
                                    src={image}
                                    alt={info.alt}
                                    preview={false}
                                    style={{
                                        borderRadius: '10px',
                                        width: '100%',
                                        height: '150px',
                                        zIndex: 5,
                                    }}
                                ></Image>
                                <h1 className="font-bold font-mono  ">
                                    {info.title}
                                </h1>
                            </div>
                        </>
                    )
                })}
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
                            onClick={() => onDelete(modalContent)}
                        >
                            Delete
                        </Button>
                    }
                >
                    <div className="flex flex-col justify-center items-center">
                        <Image
                            src={
                                modalContent.thumbnails
                                    ? modalContent.thumbnails[1]
                                          ?.image_url
                                    : ''
                            }
                            alt={
                                modalContent?.alt
                                    ? modalContent.alt
                                    : 'preview image'
                            }
                            preview={false}
                            style={{
                                borderRadius: '10px',
                                width: '200px',
                                boxShadow: '10px 5px 5px #d9d9d9',
                            }}
                        ></Image>
                        <EditForm
                            data={modalContent}
                            onClose={onClose}
                        />
                    </div>
                </Drawer>
            </>
        )
    } else {
        content = <Empty />
    }
    return (
        <>
            <div className="w-full  flex flex-wrap justify-center items-center ">
                {content}
            </div>
        </>
    )
}

const EditForm = ({ data, onClose }) => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const onFinish = (values) => {
        dispatch(editMedia({ data: values, id: data._id }))
            .then(() => {
                message.success('Edited successfully.')
            })
            .catch((error) => {
                console.log(error)
                message.error('upload failed.')
                onClose()
            })
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    useEffect(() => {
        form.setFieldsValue({
            title: data.title,
            caption: data.caption,
            description: data.description,
            alt: data.alt,
        })
    }, [data])
    return (
        <>
            <div className=" mt-5">
                <Form
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    form={form}
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                min: 5,
                                message: 'Too short to be Title',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Caption"
                        name="caption"
                        rules={[
                            {
                                min: 2,
                                message: 'Too short to be Type',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                min: 30,
                                message: 'Too short to be Type',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Alternate Text"
                        name="alt"
                        rules={[
                            {
                                min: 2,
                                message: 'Too short to be Type',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-blue-500"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
export default MediaList

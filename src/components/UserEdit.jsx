import { Button, Drawer, Form, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import 'ckeditor5-custom-build/build/ckeditor'
import { useDispatch, useSelector } from 'react-redux'
import { editUser, fetchUser } from '../features/User/userSlice'
import Password from 'antd/es/input/Password'

const editorConfiguration = {
    // plugins: [ Paragraph, Bold, Italic, Essentials ],
    toolbar: [
        'bold',
        'italic',
        'bulletedList',
        'numberedList',
        'blockQuote',
        'link',
        'image',
    ],
}

const UserEdit = () => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const showDrawer = () => {
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }
    const userData = useSelector((state) => state.user.data)
    // const userStatus = useSelector((state)=>state.user.status)
    const requestEditUser = (data) => {
        dispatch(editUser({ data, slug: userData._id }))
    }
    const userId = localStorage.getItem('userId')
    useEffect(() => {
        if (userId) {
            dispatch(fetchUser({ url: `/users/${userId}` }))
        }
    }, [])
    return (
        <div>
            <Button
                className="mx-2"
                icon={<EditOutlined />}
                onClick={showDrawer}
            >
                Edit
            </Button>
            <Drawer
                title="Edit User"
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
            >
                <UserEditForm
                    onFinishFunction={requestEditUser}
                    userData={userData}
                    onClose={onClose}
                />
            </Drawer>
        </div>
    )
}

const UserEditForm = ({ onFinishFunction, userData, onClose }) => {
    const [form] = Form.useForm()
    const { firstname, lastname, email, aboutme, slug } = userData
    useEffect(() => {
        if (userData) {
            form.setFieldsValue({
                firstname,
                lastname,
                email,
                aboutme,
                slug,
            })
        }
    })
    const layout = {
        labelCol: {
            span: 12,
        },
        wrapperCol: {
            span: 24,
        },
    }
    const onFinish = (values) => {
        //if slugisnt changed then slugshouldnt be sent to update so clearing slug
        if (slug === values.slug) {
            values.slug = undefined
        }
        console.log(values, values.slug)
        onFinishFunction(values)
        onClose()
    }
    const [showOldPasswordInput, setShowOldPasswordInput] =
        useState(false)
    return (
        <div className="w-full flex flex-col items-center">
            <div className="lg:w-[70%] md:w[90%] m-2 w-full px-3  min-h-screen ">
                <Form
                    layout="vertical"
                    {...layout}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="First Name"
                        name="firstname"
                        rules={[
                            {
                                required: true,
                                message: 'First name is required',
                            },
                            {
                                max: 350,
                                message:
                                    'Too long maximum number of character is 350',
                            },
                            {
                                min: 5,
                                message:
                                    'Too short minimum number of character is 5',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastname"
                        rules={[
                            {
                                required: true,
                                message: 'Last name is required',
                            },
                            {
                                max: 350,
                                message:
                                    'Too long maximum number of character is 350',
                            },
                            {
                                min: 5,
                                message:
                                    'Too short minimum number of character is 5',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Email is required',
                            },
                            {
                                max: 350,
                                message:
                                    'Too long maximum number of character is 350',
                            },
                            {
                                min: 5,
                                message:
                                    'Too short minimum number of character is 5',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="New Password"
                        name="newpassword"
                        rules={[
                            {
                                max: 350,
                                message:
                                    'Too long maximum number of character is 350',
                            },
                            {
                                min: 5,
                                message:
                                    'Too short minimum number of character is 5',
                            },
                        ]}
                    >
                        <Input
                            type="password"
                            onChange={(e) => {
                                if (!e.target.value) {
                                    setShowOldPasswordInput(false)
                                } else {
                                    setShowOldPasswordInput(true)
                                }
                            }}
                        />
                    </Form.Item>
                    {showOldPasswordInput ? (
                        <Form.Item
                            label="Old Password"
                            name="password"
                            rules={[
                                {
                                    required: showOldPasswordInput,
                                    message:
                                        'Old Password is required to change password',
                                },
                                {
                                    max: 350,
                                    message:
                                        'Too long maximum number of character is 350',
                                },
                                {
                                    min: 5,
                                    message:
                                        'Too short minimum number of character is 5',
                                },
                            ]}
                        >
                            <Input type="password" />
                        </Form.Item>
                    ) : null}
                    <Form.Item label="About me" name="aboutme">
                        <CKEditor
                            editor={ClassicEditor}
                            config={editorConfiguration}
                            data={form.content}
                            onChange={(event, editor) => {
                                const data = editor.getData()
                                form.setFieldsValue({
                                    aboutme: data,
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Slug"
                        name="slug"
                        rules={[
                            {
                                max: 50,
                                message: 'Too long to be title',
                            },
                            {
                                min: 3,
                                message: 'Title too short',
                            },
                        ]}
                        // validateStatus={blogError ? 'error' : null}
                        // help={
                        //     blogError
                        //         ? 'Try unique slug. Hint: add unique characters'
                        //         : null
                        // }
                    >
                        <Input value={form.slug} />
                    </Form.Item>
                    <Form.Item>
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
        </div>
    )
}
export default UserEdit

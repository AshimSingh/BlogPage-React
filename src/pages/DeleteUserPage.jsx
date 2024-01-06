import { Button, Modal, Form, Input } from 'antd'
import garbage from '../assets/garbage.png'
import { useState } from 'react'
import FormItem from 'antd/es/form/FormItem'
import { useDispatch } from 'react-redux'
import Password from 'antd/es/input/Password'
import { useSelector } from 'react-redux'
import { deleteUser } from '../features/User/userSlice'
import Logout from '../utils/Logout'

const DeleteUserPage = () => {
    const [form] = Form.useForm()
    const layout = {
        labelCol: {
            span: 12,
        },
        wrapperCol: {
            span: 24,
        },
    }
    const [open, setOpen] = useState(false)
    const [logout, setLogout] = useState(false)
    const showModal = () => {
        setOpen(true)
    }
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const userData = useSelector((state) => state.user.data)
    const handleOk = () => {
        setOpen(false)
        if (password && userData) {
            dispatch(
                deleteUser({
                    id: userData._id,
                    data: { password },
                    setLogout: { setLogout },
                })
            ).then(() => {
                setLogout(true)
            })
        }
    }
    const handleCancel = () => {
        setOpen(false)
    }
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="lg:w-[80%] md:w-[90%] w-[95%] flex flex-col items-center justify-center h-[80%]">
                <div className="bg-red-500 p-3 rounded-full h-[40%]">
                    <img
                        src={garbage}
                        className="h-full object-contain"
                    ></img>
                </div>
                <div className="lg:w-[30%] md:w-[80%] w-[95%] flex flex-col">
                    <span className=" my-4 text-xl font-semibold">
                        We are so sorry to let you go. If you want
                        delete account permanently. Click delete
                        account.
                    </span>
                    <Button
                        className="bg-red-500 text-white"
                        size="large"
                        onClick={showModal}
                    >
                        Delete
                    </Button>
                    <Modal
                        open={open}
                        title="Delete Account"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button
                                className="bg-blue-500 text-white"
                                key="1"
                                onClick={handleOk}
                            >
                                Submit
                            </Button>,
                            <Button
                                key={2}
                                onClick={handleCancel}
                                className="bg-red-500 text-white"
                            >
                                Cancel
                            </Button>,
                        ]}
                    >
                        <span>
                            User wont be able to retrive accont and
                            its content{' '}
                        </span>
                        <h1 className="font-blod text-xl my-2">
                            If you want to delete account enter
                            password
                        </h1>
                        <Form
                            layout="horizontal"
                            onFinish={handleOk}
                            {...layout}
                            form={form}
                        >
                            <FormItem name={Password}>
                                <Input
                                    type="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                ></Input>
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
                {logout ? <Logout></Logout> : null}
            </div>
        </div>
    )
}

export default DeleteUserPage

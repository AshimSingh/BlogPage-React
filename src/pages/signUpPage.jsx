import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
// import { Link } from 'react-router-dom'
import { signUpSchema } from '../utils/validationSchema'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../features/Authentication/AuthenticationSlice'
import './signIn.css'
import {
    successNotification,
    errorNotification,
} from '../components/Notification'
import SpinLoading from '../components/SpinLoading'

const SignUpPage = () => {
    const [seePassword, setSeePassword] = useState('password')
    const passwordVisiblity = () => {
        if (seePassword === 'password') {
            setSeePassword('text')
        } else {
            setSeePassword('password')
        }
    }
    return (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 overflow-hidden h-screen relative ">
            <div className="grid-col-1 ">
                <div className="container"></div>
            </div>

            <div className="grid-col-1 flex lg:justify-start justify-center items-center ">
                <UserForm
                    seePassword={seePassword}
                    passwordVisiblity={passwordVisiblity}
                />
            </div>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
export const UserForm = ({ seePassword, passwordVisiblity }) => {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.authentication.status)
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        },
        validationSchema: signUpSchema,
        onSubmit: async (values) => {
            try {
                const resp = await dispatch(signUp(values))
                console.log(resp)
                if (resp.payload.success) {
                    successNotification({
                        message: resp.payload.message,
                    })
                } else {
                    errorNotification({
                        message: resp.payload.message,
                    })
                }
            } catch (error) {
                errorNotification({ error })
            }
        },
    })
    return (
        <div className="border-2 z-10 border-blue-500 min-h-[80%] md:min-h-[60%]  rounded-md flex flex-col justify-center items-center md:w-[80%] w-[90%]">
            {status === 'pending' ? <SpinLoading /> : null}
            {/* heading i.e Signup  */}
            <h1 className="text-4xl font-bold my-5">Sign Up</h1>
            <form
                className="w-[100%] flex flex-col justify-center items-center"
                onSubmit={formik.handleSubmit}
            >
                {/* firstname input field */}
                <div className="w-[80%] m-1">
                    <div className="flex justify-start items-center w-[100%] bg-gray-200 p-2  h-[40px]  rounded-md">
                        <i className="fa-solid fa-user"></i>
                        <input
                            className="w-[80%] h-[40px] p-2 mx-2 bg-transparent focus:outline-none"
                            id="firstname"
                            name="firstname"
                            placeholder="firstname"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstname}
                        ></input>
                    </div>
                    {formik.touched.firstname &&
                    formik.errors.firstname ? (
                        <div className="text-red-500">
                            {formik.errors.firstname}
                        </div>
                    ) : null}
                </div>

                <div className="w-[80%] m-1">
                    <div className="flex justify-start items-center w-[100%] bg-gray-200 p-2  h-[40px]  rounded-md">
                        <i className="fa-solid fa-user"></i>
                        <input
                            className="w-[80%] h-[40px] p-2 mx-2 bg-transparent focus:outline-none"
                            id="lastname"
                            name="lastname"
                            placeholder="lastname"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastname}
                        ></input>
                    </div>
                    {formik.touched.lastname &&
                    formik.errors.lastname ? (
                        <div className="text-red-500">
                            {formik.errors.lastname}
                        </div>
                    ) : null}
                </div>
                {/* Email input field */}
                <div className="w-[80%] m-1">
                    <div className="flex justify-start items-center w-[100%] bg-gray-200 p-2  h-[40px]  rounded-md">
                        <i className="fa-solid fa-envelope"></i>
                        <input
                            className="w-[100%] h-[40px] p-2 mx-2 bg-transparent focus:outline-none"
                            id="email"
                            name="email"
                            placeholder="email"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        ></input>
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500">
                            {formik.errors.email}
                        </div>
                    ) : null}
                </div>

                {/* Password input field */}
                <div className="w-[80%]  m-1">
                    <div className="w-[100%] flex justify-start items-center bg-gray-200 h-[40px]    p-2 rounded-md">
                        {seePassword === 'password' ? (
                            <i
                                onClick={() => passwordVisiblity()} //icon to see or hide password
                                className="fa-solid fa-eye-low-vision "
                            ></i>
                        ) : (
                            <i
                                onClick={() => passwordVisiblity()}
                                className="fa-solid fa-eye"
                            ></i>
                        )}
                        <input
                            className="w-[100%] h-[40px] p-2 mx-2 bg-transparent focus:outline-none"
                            placeholder="password"
                            type={seePassword}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        ></input>
                    </div>
                    {formik.touched.password &&
                    formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                </div>

                <button
                    className="bg-blue-500 p-2 min-w-[50%] text-xl my-2 text-white m-2 font-semibold rounded-md"
                    type="submit"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}
export default SignUpPage

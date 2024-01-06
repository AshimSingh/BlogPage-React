import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../features/Authentication/AuthenticationSlice'
import { signInSchema } from '../utils/validationSchema'
import 'react-toastify/dist/ReactToastify.css'
import './signIn.css'
import SpinLoading from '../components/SpinLoading'
import { useNavigate,useLocation } from 'react-router-dom'
import {
    successNotification,
    errorNotification,
} from '../components/Notification'
import { message } from 'antd'
import LoadingBox from '../components/LoadingBox'

//this is sign in page which has form and animation container
const SignInPage = () => {
    return (
        // this div is for animation and little content

        <div className="grid lg:grid-cols-2 md:grid-cols-1 overflow-hidden h-screen relative">
            <div className="grid-col-1">
                <div className="container"></div>
            </div>

            {/* this div is for form */}
            <div className="grid-col-1 flex lg:justify-start justify-center items-center ">
                <Form />
            </div>
        </div>
    )
}

const Form = () => {
    const dispatch = useDispatch()
    const [seePassword, setSeePassword] = useState('password')
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const status = useSelector((state) => state.authentication.status)
    //for handeling change
    const handelChange = (e) => {
        e.preventDefault()
        var name = e.target.name
        var value = e.target.value
        setData({ ...data, [name]: value })
    }
    const navigate = useNavigate();
    const location = useLocation();
    const [showLoadingBox,setLoadingBox] = useState(false)
    const validataion = async () => {
        try {
            // eslint-disable-next-line no-unused-vars
            var validataion = await signInSchema.validate(data)
            var resp = await dispatch(Login(data))
            if (resp.payload.success) {
                //success Notify
               successNotification({ message: resp.payload.message })
                setTimeout(()=>{ 
                    if(location.state?.from){
                        navigate(location.state.from)
                    }
                    else{
                        navigate('/')
                    }
                },2000)
            } else {
                errorNotification({ message: resp.payload.message })
            }
        } catch (err) {
            errorNotification({ message: err.message })
        }
    }

    // To show and hide password when user types password and clicks password icon
    const passwordVisiblity = () => {
        if (seePassword === 'password') {
            setSeePassword('text')
        } else {
            setSeePassword('password')
        }
    }
    return (
        <div className="border-2 z-10 border-blue-500 min-h-[80%] md:min-h-[60%]  rounded-md flex flex-col justify-center items-center md:w-[80%] w-[90%]">
            {/* spin loading is absolute covers whole page not leting other button to be clicked when in pending state */}
            {status === 'pending' ? <SpinLoading /> : null}
            <h1 className="text-4xl font-bold my-5">Sign In</h1>
            <form className="w-[100%] flex flex-col justify-center items-center" onSubmit={()=>validataion()}>
                <div className="flex justify-start items-center w-[80%] bg-gray-200 m-2 h-[40px] p-2 rounded-md">
                    <i className="fa-solid fa-user"></i>
                    <input
                        className="w-[80%] h-[40px] p-2 mx-2 bg-transparent focus:outline-none"
                        placeholder="email"
                        name="email"
                        value={data.email}
                        onChange={handelChange}
                        type="text"
                    ></input>
                </div>
                <div className="flex justify-start items-center w-[80%] bg-gray-200 m-2 h-[40px] p-2 rounded-md">
                    {seePassword === 'password' ? (
                        <i
                            onClick={() => passwordVisiblity()}
                            className="fa-solid fa-eye-low-vision "
                        ></i>
                    ) : (
                        <i
                            onClick={() => passwordVisiblity()}
                            className="fa-solid fa-eye"
                        ></i>
                    )}
                    <input
                        className="w-[80%] h-[40px] p-2 mx-2 bg-transparent focus:outline-none"
                        placeholder="password"
                        type={seePassword}
                        name="password"
                        value={data.password}
                        onChange={handelChange}
                    ></input>
                </div>
                <div className="flex justify-between items-center w-[80%]  m-2  rounded-md">
                    <div className="flex">
                        <input type="checkbox"></input>
                        <h1 className="mx-2 font-semibold">
                            Remember me
                        </h1>
                    </div>
                    <Link>
                        <h1 className="mx-2 font-semibold text-blue-500">
                            Forget Password
                        </h1>
                    </Link>
                </div>
                <button
                    className="bg-blue-500 p-2 min-w-[50%] text-xl my-2 text-white m-2 font-semibold rounded-md"
                    type="button"
                    onClick={() => {validataion()
                    setLoadingBox(true)
                    setTimeout(()=>{
                        setLoadingBox(false)
                    },2000)
                    }}
                >
                    Sign In
                </button>
            </form>
            {showLoadingBox?<SpinLoading/>:null}
        </div>
    )
}
export default SignInPage

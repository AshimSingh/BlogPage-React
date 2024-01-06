import axios from '../../config/axiosinstance'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'

const initialState = {
    data: null,
    otherUserData: null,
    usersList: null,
    message: null,
    status: 'idle',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.data = action.payload.data
                } else {
                    message.error('Cannot fetch user')
                }
            })
            .addCase(fetchUser.rejected, () => {
                message.error('Cannot fetch user')
            })
            .addCase(editUser.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.data = action.payload.data
                    message.success('User Profile Updated')
                } else {
                    message.error('Failed to update user profile')
                }
            })
            .addCase(editUser.rejected, () => {
                message.error('Failed to update user')
            })
            .addCase(editUser.pending, () => {
                message.warning('Updating user')
            })
            .addCase(deleteUser.pending, () => {
                message.warning('Deleting user')
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                console.log(action.payload.message)
                if (action.payload.success) {
                    message.success('User Deleted')
                } else {
                    message.error(
                        `Cannot Delete ${action.payload.message}`
                    )
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                message.error(
                    `Cannot Delete ${action.payload.message}`
                )
            })
            .addCase(fetchOtherUser.fulfilled, (state, action) => {
                console.log(action.payload.data)
                if (action.payload.success) {
                    state.otherUserData = action.payload.data
                } else {
                    state.otherUserData = ''
                }
            })
            .addCase(fetchUsersList, (state, action) => {
                if (action.payload.success) {
                    state.usersList = action.payload.data
                } else {
                    state.usersList = ''
                }
            })
    },
})

export const fetchUser = createAsyncThunk(
    'fetch/user',
    async ({ url }) => {
        try {
            var requestUrl = url ? url : `/users`
            console.log(requestUrl, 'our url')
            const response = await axios.get(requestUrl)
            console.log(response.data, 'response')
            return response.data
        } catch (error) {
            console.log(url, error, 'user')
        }
    }
)
export const editUser = createAsyncThunk(
    '/edit/user',
    async ({ data, slug }) => {
        //clearing null values
        const postData = {}
        Object.keys(data).map((key) => {
            const value = data[key]
            if (value) {
                postData[key] = value
            }
        })
        try {
            console.log('postdata', postData)
            const response = await axios.patch(
                `/users/${slug}`,
                postData
            )
            console.log(response.data)
            return response.data
        } catch (error) {
            return error.response.data
        }
    }
)

export const deleteUser = createAsyncThunk(
    'delete/User',
    async ({ id, data }) => {
        try {
            console.log(id, data, 'from slice')
            const response = await axios.delete(`/users/${id}`, {
                data: data,
            })
            console.log(response.data)
            return response.data
        } catch (error) {
            return error.response.data
        }
    }
)

export const fetchOtherUser = createAsyncThunk(
    'fetch/user/other',
    async ({ url }) => {
        try {
            var requestUrl = url ? url : `/users`
            const response = await axios.get(requestUrl)
            return response.data
        } catch (error) {
            console.log(url, error, 'user')
        }
    }
)

export const fetchUsersList = createAsyncThunk(
    'fetch/user/list',
    async ({ url }) => {
        try {
            var requestUrl = url ? url : `/users`
            const response = await axios.get(requestUrl)
            return response.data
        } catch (error) {
            console.log(url, error, 'user')
        }
    }
)

// export const useFetchUser = ({ url }) => {
//     const [userData, setUserData] = useState([])
//     const [errorData, setErrorData] = useState(null) // Change errorData to a single error object

//     const fetchUser = async () => {
//         try {
//             const response = await axios.get(url)
//             setUserData(response.data.data)
//             console.log(response.data.data, url, 'user url')
//         } catch (error) {
//             console.error(error)
//             setErrorData(error) // Set the error object
//         }
//     }

//     useEffect(() => {
//         fetchUser()
//     }, [url])

//     // Return userData and errorData as part of the custom hook's return value
//     return { userData, errorData }
// }

// export const useFetchAllUsers = () => {
//     const [usersData, setUserData] = useState([])
//     const [errors, setErrorData] = useState(null) // Change errorData to a single error object

//     const fetchUser = async () => {
//         try {
//             var requestUrl = `/users?limit=5`
//             const response = await axios.get(requestUrl)
//             setUserData(response.data.data)
//         } catch (error) {
//             setErrorData(error) // Set the error object
//         }
//     }

//     useEffect(() => {
//         fetchUser()
//     }, [])

//     // Return userData and errorData as part of the custom hook's return value
//     return { usersData, errors }
// }

export default userSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/axiosinstance'

const initialState = {
    status: 'idle',
    success: null,
    error: null,
}

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setToken: (state, action) => {
            console.log(action.payload, 'msg slice')
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('userId', action.payload._id)
            state.success = 'fulfilled'
        },
        // extraReducers(builder) {
        //     builder
        //         .addCase(Login.fulfilled, (state, action) => {
        //             state.success = action.payload.success
        //         })
        //         .addCase(signUp.fulfilled, (state, action) => {
        //             console.log(action.payload)
        //             state.message = action.payload.message
        //             state.success = action.payload.success
        //         })
        // },
    },
    extraReducers(builder) {
        builder
            .addCase(Login.fulfilled, (state) => {
                state.status = 'fulfilled'
            })
            .addCase(Login.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(Login.rejected, (state) => {
                state.status = 'rejected'
                // state.message = action.payload.message
                // state.success = action.payload.success
            })
            .addCase(signUp.fulfilled, (state) => {
                state.status = 'fulfilled'
            })
            .addCase(signUp.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(signUp.rejected, (state) => {
                state.status = 'rejected'
                // state.message = action.payload.message
                // state.success = action.payload.success
            })
    },
})
export const { setToken } = authenticationSlice.actions

//login accepts data sent from signIn page
export const Login = createAsyncThunk(
    'login',
    async (data, { dispatch }) => {
        try {
            const response = await axios.post('/users/login', data)
            await dispatch(setToken(response.data.data))
            console.log(response.data, 'response here')
            return response.data
        } catch (error) {
            console.log(error, 'error')
            return error.response.data
        }
    }
)

export const signUp = createAsyncThunk(
    'signUp',
    async (data, { dispatch }) => {
        try {
            var postData = {}
            Object.keys(data).map((key) => {
                const value = data[key]
                if (value) {
                    postData[key] = value
                }
            })
            const response = await axios.post('/users/', postData)
            await dispatch(setToken(response.data.data))
            return response.data
        } catch (error) {
            return error.response.data
        }
    }
)

export default authenticationSlice.reducer

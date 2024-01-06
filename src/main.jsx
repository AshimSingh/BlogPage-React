import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { io } from 'socket.io-client'

export const socket = io(import.meta.env.VITE_SERVER)
socket.on('connect', () => {
    console.log(socket.id) // x8WIv7-mJelg7on_ALbx
})

socket.on('disconnect', () => {
    console.log(socket.id) // undefined
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}>
                {/* <App /> */}
            </RouterProvider>
        </Provider>
    </React.StrictMode>
)

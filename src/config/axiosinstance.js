import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
})

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
            ? localStorage.getItem('token')
            : null
        config.headers['Authorization'] = `bearer ${token}`

        return config
    },
    (error) => {
        console.log(error)
        Promise.reject(error)
    }
)

export default instance

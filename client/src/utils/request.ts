import axios from 'axios'
const request = axios.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_API,
    timeout: 5000
})
request.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)
request.interceptors.response.use(response => {
    // const { success, message, data ] = response.data
    // if (!success) { return Promise. reject (new Error (message)) } else { return data }
    const status = response.status;
    const res = response.data

    if (status !== 200) {
        console.log(res)
        return Promise.reject(new Error(res.message || 'Error'))
    } else {
        return res
    }
})

export default request
import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:2880',
    timeout: 5000
})

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    err => Promise.reject(err)
)

export const saveRoomRequest = async (room) => {
    try {
        return await apiClient.post('/room/add', room)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getRoomRequest = async () => {
    try {
        return await apiClient.get('/room/list')
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getRoomByHotelIdRequest = async (id) => {
    try {
        return await apiClient.get(`/room/listRoomByHotel/${id}`)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

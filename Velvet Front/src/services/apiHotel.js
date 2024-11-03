import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:2880',
    timeout: 5000
})

export const getHotelsRequest = async () => {
    try {
        return await apiClient.get('/hotel/list')
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getHotelsIdRequest = async (id) => {
    try {
        return await apiClient.get(`/hotel/listId/${id}`)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}
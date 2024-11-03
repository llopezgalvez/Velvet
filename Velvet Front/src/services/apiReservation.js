import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:2880',
    timeout: 5000
})



apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.token = token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


export const createReservationRequest = async (roomId, reservationData) => {
    try {
        const response = await apiClient.post(`/reservation/add`, {
            roomId,
            ...reservationData
        });
        return response.data;
    } catch (error) {
        console.error('Error creating reservation:', error);
        return { error: error.response?.data?.message || error.message };
    }
};

export const getReservations = async () =>{
    try {
        const response = await apiClient.get('/reservation/list')
        return response.data
    } catch (error) {
        return {error: error.response.data || "Error general al mostrar las reservaciónes"}
    }
}

export const deleteReservation = async (id) => {
    try {
        const response = await apiClient.delete(`/reservation/delete/${id}`)
        return response.data
    } catch (error) {
        return {error: error.response.data || "Error general al eliminar la reservación"}
    }
}

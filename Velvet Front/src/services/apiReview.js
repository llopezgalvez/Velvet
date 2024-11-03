import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:2880',
    timeout: 5000
})

    export const getReviewByHotelIdRequest = async(id)=>{
        try {
            return await apiClient.get(`/review/listReviewHotel/${id}`)
        } catch (err) {
            return {
                error: true,
                err
            }
        }
    }
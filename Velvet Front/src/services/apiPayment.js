import axios from "axios"

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

export const registerRequest = async(data)=>{
    try{
        return await apiClient.post('/user/newUser', data)
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const loginRequest = async(user)=>{
    try{
        return await apiClient.post('/user/login', user)
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const savePaymentRequest = async (methodOfPay) => {
    try {
        return await apiClient.post('methodOfPay/add', methodOfPay)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getPaymentRequest = async () => {
    try {
        const response = await apiClient.get('methodOfPay/list')
        return response.data
    } catch (error) {
        return {error: error.response.data || 'Error general al obtener los métodos de pago'}
    }
}

export const deletePaymentRequest = async (id) => {
    try {
        const response = await apiClient.delete(`methodOfPay/delete/${id}`)
        return response.data
    } catch (error) {
        return {error: error.response.data || 'Error general al eliminar el método de pago'}
    }
}
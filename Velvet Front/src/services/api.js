import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:2880',
    timeout: 6000
})

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
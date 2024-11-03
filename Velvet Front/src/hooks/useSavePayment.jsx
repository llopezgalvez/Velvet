import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { savePaymentRequest, getPaymentRequest } from "../services/apiPayment.js";

export const useSavePayment = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const savePayment = async (methodOfPay) =>{
        setIsLoading(true)
        const response = await savePaymentRequest (methodOfPay)
        setIsLoading(false)
        if(response.error){
            return alert('Error save methmethodOfPay')
        }
        navigate('/payment')
    }

    return {
        isLoading,
        savePayment
    }
}
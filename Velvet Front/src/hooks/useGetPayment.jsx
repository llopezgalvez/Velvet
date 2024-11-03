import { useState, useEffect } from "react";
import { getPaymentRequest, deletePaymentRequest } from "../services/apiPayment.js";

export const useGetPaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPaymentMethods = async () => {
        setIsLoading(true);
        const response = await getPaymentRequest();
        setIsLoading(false);
        if (response.error) {
            setError(response.error);
        } else if (response.methodsOfPay) {
            setPaymentMethods(response.methodsOfPay);
        }
    };

    const deletePaymentMethod = async (id) => {
        const response = await deletePaymentRequest(id);
        if (response.error) {
            setError(response.error);
        } else {
            fetchPaymentMethods(); // Recargar los métodos de pago después de la eliminación
        }
    };

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    return { paymentMethods, isLoading, error, deletePaymentMethod, fetchPaymentMethods};
};
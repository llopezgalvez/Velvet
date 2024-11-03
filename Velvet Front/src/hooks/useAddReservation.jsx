import { useState } from 'react';
import toast from 'react-hot-toast';
import { createReservationRequest } from '../services/apiReservation';

export const useAddReservation = () => {
    const [isLoading, setIsLoading] = useState(false);

    const create = async (id, start, end, methodOfPay) => {
        setIsLoading(true);
        const reservation = {
            start,
            end,
            methodOfPay
        };
        try {
            const response = await createReservationRequest(id, reservation);
            setIsLoading(false);

            if (response.error) {
                toast.error(response.error || 'Error general al intentar reservar una habitación. Intenta de nuevo.');
                return { success: false, error: response.error };
            }
            toast.success('Reservación creada exitosamente');
            return { success: true, data: response.data };
        } catch (error) {
            setIsLoading(false);
            toast.error('Error general al intentar reservar una habitación. Intenta de nuevo.');
            return { success: false, error: error.message };
        }
    };

    return { create, isLoading };
};

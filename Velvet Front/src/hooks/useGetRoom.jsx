import { useState } from "react";
import { getRoomRequest } from "../services/apiRoms";
export const useGetRooms = () => {

    const [rooms, setRooms] = useState(null);

    const getRooms = async () => {
        const response = await getRoomRequest();
        if (response.error) {
            if (response?.err?.response?.data?.errors) {
                let arr = response?.err?.response?.data?.errors
                for (const error of arr) {
                    return toast.error(
                        error.msg
                    )
                }
            }
            return toast.error(
                response?.err?.response?.data?.msg ||
                response?.err?.data?.msg ||
                'Error al registrar el room, intenta de nuevo.'
            )
        }
        console.log(response)

        setRooms(response.data.rooms)
    }
    return {
        rooms,
        isFetching: !rooms,
        getRooms
    }
}
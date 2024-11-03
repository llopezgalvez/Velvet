import { createContext, useContext, useState } from "react";
import { getHotelsRequest, getHotelsIdRequest } from "../services/apiHotel";

const HotelsContext = createContext();

export const useHotels = () => {
    const context = useContext(HotelsContext)
    if (!context) {
        throw new Error("useHotels must be used within a HotelProvider ")
    }
    return context
}

export const HotelsProvaider = ({ children }) => {
    const [hotels, setHotels] = useState([])

    //Listar todos los hoteles
    const getHotels = async () => {
        try {
            const res = await getHotelsRequest()
            setHotels(res.data)
        } catch (error) {
            console.error(error)
        }
    }


    //Para obtener la información de un solo hotel
    const getHotel = async (id) => {
        try {
            const res = await getHotelsIdRequest(id);
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <HotelsContext.Provider value={{ hotels, getHotels, getHotel }}>
            {children}
        </HotelsContext.Provider>
    )
}

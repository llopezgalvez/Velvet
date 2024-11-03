import { useState, useEffect } from "react"
import { getReservations, deleteReservation } from "../services/apiReservation"

export const useGetReservations = ()=>{
    const [reservationData, setReservationData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchReservations = async ()=>{
        setIsLoading(true)
        const response = await getReservations()
        setIsLoading(false)
        if(response.error){
            setError(response.error)
        } else if (response.reservations){
            setReservationData(response.reservations)
        }
    }

    const deleteReservation = async (id) =>{
        const response = await deleteReservation(id)
        if (response.error) {
            setError(response.error)
        } else {
            fetchReservations()
        }
    }

    useEffect(()=>{
        fetchReservations()
    },[])

    return {
        reservationData,
        isLoading,
        error, fetchReservations, deleteReservation
    }
}
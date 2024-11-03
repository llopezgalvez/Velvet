import { Route, Routes } from "react-router-dom"
import { RoomCard } from "./RoomCard"
import { useEffect } from "react"
import { ClockLoader } from "react-spinners"
import { useGetRooms } from "../../hooks/useGetRoom"

export const ShowRooms = () => {

    const {rooms, getRooms, isFetching} = useGetRooms()

    useEffect(()=>{
        getRooms()
    }, [])

    if (isFetching) {
        return (
            <div className="container d-flex align-items-center justify-content-center vh-100">
                <ClockLoader />
            </div>
        )
    }

    return (
        <div>
            <Routes>
                <Route path="show" element={<RoomCard rooms={rooms} />} />
            </Routes>
        </div>
    )
}
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import axios from 'axios'
import './Grafica.css'

export const GraficaLinea = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2880/reservation/listGrafic')
                const aggregatedData = aggregateData(response.data)
                setData(aggregatedData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const aggregateData = (rawData) => {
        const aggregatedData = []
        const hotelMap = new Map()

        rawData.forEach(entry => {
            const hotelName = entry.name
            const reservations = entry.reservations

            if (!hotelMap.has(hotelName)) {
                hotelMap.set(hotelName, reservations)
            } else {
                const currentReservations = hotelMap.get(hotelName)
                hotelMap.set(hotelName, currentReservations + reservations)
            }
        })

        hotelMap.forEach((reservations, name) => {
            aggregatedData.push({ name, reservations })
        })

        return aggregatedData
    }

    return (
        <>
            <h1 className="title">Reservaciones por Hotel</h1>
            <div className="containers">
                <div className="subcontainer">
                    <LineChart
                        width={800}
                        height={400}
                        data={data}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 50
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="name"
                            tick={{ angle: -45, textAnchor: 'end' }}
                            height={70}
                        />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc', borderRadius: '5px' }} />
                        <Legend wrapperStyle={{ fontFamily: 'Arial, sans-serif', fontSize: '12px' }} />
                        <Line type="monotone" dataKey="reservations" stroke="#8884d8" />
                    </LineChart>
                </div>
            </div>
        </>
    )
}

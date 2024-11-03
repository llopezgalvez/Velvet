import React, { useEffect, useState } from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts'
import axios from 'axios'
import './Grafica.css'

export const GraficaRadar = () => {
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

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00']

    return (
        <>
            <h1 className="title">Hoteles con Más Reservaciones</h1>
            <div className="containers">
                <div className="subcontainer">
                    <RadarChart
                        outerRadius={150}
                        width={800}
                        height={400}
                        data={data}
                    >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
                        <Radar name="Reservations" dataKey="reservations" stroke={colors[0]} fill={colors[0]} fillOpacity={0.6} />
                        <Tooltip />
                        <Legend />
                    </RadarChart>
                </div>
            </div>
        </>
    )
}

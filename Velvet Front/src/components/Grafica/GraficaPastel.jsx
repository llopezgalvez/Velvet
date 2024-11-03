import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import axios from 'axios'
import './Grafica.css'

export const GraficaPastel = () => {
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
            <h1 className="title">Reservaciones por Hotel</h1>
            <div className="containers">
                <div className="subcontainer">
                    <PieChart width={800} height={400}>
                        <Pie
                            data={data}
                            dataKey="reservations"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc', borderRadius: '5px' }} />
                        <Legend wrapperStyle={{ fontFamily: 'Arial, sans-serif', fontSize: '12px' }} />
                    </PieChart>
                </div>
            </div>
        </>
    )
}

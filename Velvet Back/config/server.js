import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import {config} from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import hotelRoutes from '../src/Hotel/hotel.routes.js'
import reviewRoutes from '../src/Review/review.routes.js'
import roomRoutes from '../src/room/room.routes.js'
import reservationRoutes from '../src/reservation/reservation.routes.js'
import methodOfPayRoutes from '../src/methodOfPay/methodOfPay.routes.js'
import eventRoutes from '../src/event/event.routes.js'
import invoiceRoutes from '../src/invoice/invoice.routes.js'
import { admin, defaultCategory } from '../src/utils/defaults.js'

const server = express()
config()
const port = process.env.PORT || 3200
//Datos defualt
admin()
defaultCategory()


server.use(express.urlencoded({ extended: false }))
server.use(express.json())
server.use(cors())
server.use(morgan('dev'))
server.use(helmet())

server.use('/user', userRoutes)
server.use('/category', categoryRoutes)
server.use('/hotel', hotelRoutes)
server.use('/review', reviewRoutes)
server.use('/room', roomRoutes)
server.use('/reservation', reservationRoutes)
server.use('/methodOfPay', methodOfPayRoutes)
server.use('/event', eventRoutes)
server.use('/invoice', invoiceRoutes)

export const initServer = async () => {
    server.listen(port, () => {
        console.log(`Server HTTP running in port ${port}`)
    })
}
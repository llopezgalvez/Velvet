import {Router} from 'express'
import {test, addReservation, deleteReservation, listReservations, searchReservations, listReservationsByUserId, getHotelsWithMostReservations} from './reservation.controller.js'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'

const api = Router()

api.get('/test',[validateJwt, isAdmin], test)
api.post('/add', [validateJwt], addReservation)
api.delete('/delete/:id', [validateJwt], deleteReservation)
api.get('/list', [validateJwt], listReservations)
api.post('/search', [validateJwt], searchReservations)
api.get('/reservationUser/:id', [validateJwt], listReservationsByUserId)
api.get('/listGrafic', getHotelsWithMostReservations)


export default api
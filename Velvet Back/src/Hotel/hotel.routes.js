import { Router } from "express";
import { HotelId, add, deleteHotel, display, test, update } from "./hotel.controller.js";
import { isAdmin, validateJwt } from "../middlewares/validate-jwt.js";

const api = Router()

//AdminRoutes
api.get('/test',[validateJwt, isAdmin], test)
api.post('/add', add)
api.delete('/delete/:id',[validateJwt, isAdmin],deleteHotel)
api.put('/update/:id',[validateJwt, isAdmin], update)
//UserRoutes

//PublicRoutes
api.get('/list', display)
api.get('/listId/:id', HotelId)

export default api
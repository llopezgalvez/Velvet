import { Router } from "express"

import { addEvent, updateEvent, deleteEvent, listEvent, searchEvent } from "./event.controller.js"
import { validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()

api.post('/addEvent', [validateJwt], addEvent)
api.put('/updEvent/:id', [validateJwt], updateEvent)
api.delete('/deleteEvent/:id', [validateJwt], deleteEvent)
api.get('/listEvents', [validateJwt], listEvent)
api.post('/searchEvent', [validateJwt], searchEvent)

export default api
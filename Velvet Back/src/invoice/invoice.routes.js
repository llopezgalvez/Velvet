import { Router } from "express";
import { generated, myInvoices } from "./invoice.controller.js";
import {validateJwt} from '../middlewares/validate-jwt.js'


const api = Router()

api.post('/generate/:id', [validateJwt], generated)
api.get('/display', [validateJwt], myInvoices)

export default api

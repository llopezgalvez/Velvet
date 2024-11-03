import {Router} from 'express'
import { addMethodOfPay, deletedMethodOfPay, listMethodsOfPayment} from './methoOfPay.controller.js'
import {validateJwt} from '../middlewares/validate-jwt.js'
const api = Router()

api.post('/add', [validateJwt], addMethodOfPay)
api.delete('/delete/:id', [validateJwt], deletedMethodOfPay)
api.get('/list', [validateJwt], listMethodsOfPayment)

export default api
'use strict'

import { Router } from 'express'
import { newUser, deleteUser, updateUser, searchUser, listUsers, login } from './user.controller.js'

const api = Router()

api.post('/newUser', newUser)
api.put('/updateUser/:id', updateUser)
api.delete('/deleteUser/:id', deleteUser)
api.post('/searchUser', searchUser)
api.get('/listUser', listUsers)
api.post('/login', login)

export default api
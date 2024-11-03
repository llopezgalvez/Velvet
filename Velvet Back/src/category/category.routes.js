'use strict'

import { Router } from "express"
import { addCategory, updateCategory, listCategories, searchCategory, deleteCategory } from "./category.controller.js"
import { validateJwt, isAdmin } from "../middlewares/validate-jwt.js"

const api = Router()

api.post('/addCategory', addCategory)
api.put('/updateCategory/:id',[validateJwt, isAdmin], updateCategory)
api.get('/listCategories', listCategories)
api.post('/searchCategory', [validateJwt, isAdmin], searchCategory)
api.delete('/deleteCategory/:id',[validateJwt, isAdmin], deleteCategory)

export default api
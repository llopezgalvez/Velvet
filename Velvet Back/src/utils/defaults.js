'use strict'
import User from '../user/user.model.js'
import Category from '../category/category.model.js'
import { encrypt } from './validator.js'

export const admin = async()=>{
    try {
        let admin = new User({
            "name" : "Admin",
            "surname" : "Admin",
            "email" : "suportHotels@gmail.com",
            "phone" : "12345678",
            "password" : "admin123",
            "role" : "ADMIN"
        }
        )
        admin.password = await encrypt(admin.password)
        if (!await User.findOne({name:"Admin"},{role: "ADMIN"}) ){
            await admin.save()
            console.log("default Admin created")           
        }
        return console.log("default Admin already exists")
    } catch (error) {
        console.error(error)
        return error
    }
}

export const defaultCategory = async()=>{
    try {
        let category = new Category({
            "name":"Standard",
            "description":"Hoteles con las comodidades esenciales, como cama, baño y televisión. "
        })
        if(!await Category.findOne({name: "Standard"})){
            await category.save()
            console.log("Stardard Category created")
        }
        return console.log("Stardard category already exists")
    } catch (error) {
        console.error(error)
        return error
    }
}
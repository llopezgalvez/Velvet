'use strict'

import User from './user.model.js'
import { generateJwt } from '../utils/generateToken.js'
import { encrypt, checkPassword } from '../utils/validator.js'

export const login = async (req, res) => {
    try {
        let { password, email, phone } = req.body
        let user = await User.findOne({ $or: [{ email: email }, { phone: phone }] })
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                surname: user.surname,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send({
                message: `Welcome ${loggedUser.name}`,
                loggedUser,
                token
            })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Failed to  login' })
    }
}

export const newUser = async (req, res) => {
    try {
        let data = req.body
        console.log(data)
        data.password = await encrypt(data.password)
        let existsEmail = await User.findOne({ email: data.email })
        if (existsEmail) return res.status(409).send({ msg: `They have already registered with the email: ${data.email}` })

        let existsPhone = await User.findOne({ phone: data.phone })
        if (existsPhone) return res.status(409).send({ msg: `They have already registered with the phone number: ${data.phone}` })

        let user = new User(data)
        console.log(data)
        await user.save()
        return res.send({ msg: 'Has been register with success' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error registering', error })
    }
}

export const updateUser = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        //CheckUpdate
        if (data.password) {
            data.password = await encrypt(data.password);
        }
        let upUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!upUser) return res.status(401).send({ msg: 'User not updated' })
        return res.send({ msg: 'User updated' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error when trying to update User information' })
    }
}

export const deleteUser = async (req, res) => {
    try {
        let { id } = req.params
        let delUser = await User.findOneAndDelete({ _id: id })
        if (!delUser) return res.status(404).send({ msg: 'User not found' })
        return res.send({ msg: 'User deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error deleting user' })
    }
}

export const listUsers = async (req, res) => {
    try {
        let users = await User.find()
        if (users.length == 0) return res.status(404).send({ msg: 'Not found users' })
        return res.send({ users })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error getting categories' })
    }
}


export const searchUser = async (req, res) => {
    try {
        let { search } = req.body
        let user = await User.find({
            $or: [
                { name: search },
                { surname: search },
                { phone: search },
                { email: search }
            ]
        })

        if (user.length == 0) return res.status(404).send({ msg: 'User not found' })
        return res.send({ msg: 'User found', user })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error searching user' })
    }
}
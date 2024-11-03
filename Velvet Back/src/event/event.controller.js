'use strict'

import Hotel from '../Hotel/hotel.model.js'
import Event from './event.model.js'
import mongoose from 'mongoose'

export const addEvent = async (req, res) => {
    try {
        let userID = req.user.id
        let data = req.body

        let existsHotel = await Hotel.findOne({ _id: data.hotel })
        if (!existsHotel) return res.status(404).send({ msg: 'The hotel is not found' })

        //Verificar que no este programados a la misma hora
        // let checkTime = await Event.find({time: data.time})
        // if(checkTime.length > 0) return res.send({msg: 'Choose another time'})

        let event = new Event(
            {
                date: data.date,
                time: data.time,
                user: userID,
                hotel: data.hotel,
                typeEvent: data.typeEvent,
                servicesAdditional: data.servicesAdditional,
                price : data.price 
            }
        )
        await event.save()
        return res.send({ msg: 'Event added with success' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error when trying to add an event' })
    }
}

export const deleteEvent = async (req, res) => {
    try {
        let { id } = req.params
        let delEvent = await Event.findOneAndDelete({ _id: id })
        if (!delEvent) return res.status(404).send({ msg: 'Evento not found' })
        return res.send({ msg: 'Event deleted successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error deleting event' })
    }
}

export const updateEvent = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        let updEvent = await Event.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updEvent) return res.status(401).send({ msg: 'Event not updated' })
        return res.send({ msg: 'Event updated successfully', updEvent })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error updating event' })
    }
}

export const listEvent = async (req, res) => {
    try {
        let events = await Event.find()
            .populate({path: 'hotel', select: 'name address -_id'})
            .populate({path: 'user', select: 'name surname -_id'})
        if (events.length == 0) return res.status(404).send({ msg: 'Not found events' })
        return res.send({ events })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error listing events' })
    }
}

export const searchEvent = async (req, res) => {
    try {
        let { search } = req.body
        let events

        const parsedDate = new Date(search)
        if (!isNaN(parsedDate)) {
            events = await Event.find({ date: parsedDate })
        } else if (mongoose.Types.ObjectId.isValid(search)) {
            events = await Event.find({ hotel: search })
        } else {
            events = await Event.find({
                $or: [
                    { time: search },
                    { typeEvent: search },
                    { servicesAdditional: search }
                ]
            })
        }

        if (events.length === 0) {
            return res.status(404).send({ msg: 'Event not found' })
        }
        return res.send({ events })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error searching for events' })
    }
}
'use strict'
import mongoose from 'mongoose';

import Room from './room.model.js'
import Hotel from '../Hotel/hotel.model.js'

export const test = async (res, req) => {
    try {
        return req.send({message: 'CRUD room funcionando'})
    } catch (error) {
        console.log(error)
    }
}

export const addRoom = async (req, res) => {
    try {
        let data = req.body
        // Buscar el hotel por su ID
        let hotel = await Hotel.findById(data.hotelId)
        if (!hotel) return res.status(404).send({ message: 'Hotel not found' })
        data.capacity = {
            numberOfAdults: data.numberOfAdults,
            numberOfChildren: data.numberOfChildren,
            amountOfRooms: data.amountOfRooms,
            numberOfPets: data.numberOfPets || 0
        }
        // Verificar si el hotel es petFriendly y el número de mascotas es válido
        let pets = hotel.featured_services.petFriendly

        if (data.capacity.numberOfPets > 3) return res.send({msg: 'The number of pets allowed is 3'})

        if (pets === 'Y') {
            if (data.capacity.numberOfPets >= 1) {
                let room = new Room(data)
                await room.save()
                return res.status(200).send({ message: 'Room added successfully', room})
            } else {
                let room = new Room(data)
                await room.save()
                return res.status(200).send({ message: 'Room added successfully', room})
            }
        } else if(pets === 'N'){
            if(data.capacity.numberOfPets >= 1){
                return res.status(400).send({ message: 'The hotel is not petFriendly'})
            } else {
                let room = new Room(data)
                await room.save()
                return res.status(200).send({ message: 'Room added successfully', room})
            }
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error adding room', error })
    }
}

export const updateRoom = async (req, res) =>{
    try {
        let data = req.body
        let idRoom = req.params.id
        let room = await Room.findById(idRoom)
        if (!room) return res.status(404).send({ message: 'Room not found' })
        let hotel = await Hotel.findById(room.hotelId)
        if (!hotel) return res.status(404).send({ message: 'Hotel not found' })
        let pets = hotel.featured_services.petFriendly;
        data.capacity = {
            numberOfAdults: data.numberOfAdults,
            numberOfChildren: data.numberOfChildren,
            amountOfRooms: data.amountOfRooms,
            numberOfPets: data.numberOfPets || 0        }
        data.date = {
            starDate: data.starDate,
            endDate: data.endDate
        }

        if (data.capacity.numberOfPets > 3) return res.send({msg: 'The number of pets allowed is 3'})
        
        if (pets === 'Y') {
            if (data.capacity.numberOfPets >= 1) {
                let updatedRoom = await Room.findOneAndUpdate({_id: idRoom}, data, {new: true}).populate({path: 'hotelId', select: 'name -_id'})
                return res.status(200).send({ message: 'Changes is saved successfully', updatedRoom})
            } else {
                let updatedRoom = await Room.findOneAndUpdate({_id: idRoom}, data, {new: true}).populate({path: 'hotelId', select: 'name -_id'})
                return res.status(200).send({ message: 'Changes is saved successfully', updatedRoom})
            }
        } else if(pets === 'N'){
            if(data.capacity.numberOfPets >= 1){
                return res.status(400).send({ message: 'The hotel is not petFriendly'})
            } else {
                let updatedRoom = await Room.findOneAndUpdate({_id: idRoom}, data, {new: true}).populate({path: 'hotelId', select: 'name -_id'})
                return res.status(200).send({ message: 'Changes is saved successfully', updatedRoom})
            }
        }

        let updatedRoom = await Room.findOneAndUpdate({_id: idRoom}, data, {new: true}).populate({path: 'hotelId', select: 'name -_id'})
        if(!updatedRoom) return res.status(401).send({message: 'Room not found and not updated'})
        return res.send({message: 'Room updated successfully', updatedRoom})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error in function updateRoom'})
    }
}

export const deleteRoom = async (req, res) => {
    try {
        let {id} = req.params
        let room = await Room.findById(id)
        let deletedRoom = await Room.findOneAndDelete({_id:id}).populate({path: 'hotelId', select: 'name -_id'})
        await Hotel.findOneAndUpdate(
            { _id: room.hotelId},
            { $pull: {roomId:id}}
        )
        if(!deletedRoom) return res.status(401).send({message: 'Room not found and not deleted'})
        return res.send({message: 'Room deleted successfully', deletedRoom})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting room', error})
    }
}

export const listRoom = async (req, res) => {
    try {
        let rooms = await Room.find().populate({path: 'hotelId', select: 'name -_id'})
        if (!rooms) return res.status(404).send({ message: 'Rooms not found' })
        return res.status(200).send({ message: 'Rooms found successfully', rooms })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error finding rooms', error })
    }
}


export const searchRoom = async (req, res) => {
    try {
        let searchQuery = req.body.search
        if (!searchQuery) return res.status(400).send({ message: 'Search term is required in the request body' })

        // Crear una expresión regular para buscar el término de búsqueda en cualquier parte del nombre del hotel
        const regex = new RegExp(searchQuery, 'i')

        // Buscar hoteles que coincidan con el término de búsqueda en cualquier parte del nombre
        let hotels = await Hotel.find({ name: { $regex: regex } })
        if (!hotels || hotels.length === 0) return res.status(404).send({ message: 'Hotels not found' })

        // Obtener los IDs de los hoteles encontrados
        let hotelIds = hotels.map(hotel => hotel._id)

        // Buscar habitaciones que pertenezcan a los hoteles encontrados
        let rooms = await Room.find({ hotelId: { $in: hotelIds } }).populate({path: 'hotelId', select: 'name -_id'})

        if (!rooms || rooms.length === 0) return res.status(404).send({ message: 'Rooms not found' })

        return res.status(200).send({ message: 'Rooms found successfully', rooms })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error finding rooms', error })
    }
}
export const listRoomsByHotelId = async (req, res) => {
    try {
        const { id: hotelId } = req.params; // Asegúrate de que el nombre del parámetro sea consistente
        if (!mongoose.Types.ObjectId.isValid(hotelId)) {
            return res.status(400).send({ message: 'Invalid hotel ID format' });
        }

        const rooms = await Room.find({ hotelId: hotelId }).populate({ path: 'hotelId', select: 'name -_id' });
        if (!rooms || rooms.length === 0) {
            return res.status(404).send({ message: 'Rooms not found for this hotel ID' });
        }
        return res.status(200).send({ message: 'Rooms found successfully', rooms });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error finding rooms', error });
    }
};

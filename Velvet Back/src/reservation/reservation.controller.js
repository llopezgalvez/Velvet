'use strict'
import mongoose from 'mongoose';
import Reservation from './reservation.model.js'
import Room from '../room/room.model.js'
import Hotel from '../Hotel/hotel.model.js'
import MethodOfPay from '../methodOfPay/methodOfPay.model.js'
import User from '../user/user.model.js'

export const test = async (req, res) => {
    try {
        return res.send({message: 'CRUD Reservation funcionando'})
    } catch (error) {
        console.error(error)
    }
}

/*
export const addReservation = async (req, res) => {
    try {
        let {roomId, methodOfPay, start, end} = req.body
        let room = await Room.findById(roomId)
        if(!room) return res.send({message: 'Room not found'})
        let methodOfPayload = await MethodOfPay.findById(methodOfPay)
        if (!methodOfPayload) return res.send({message: 'Method of payment not found'})
        let authorId = req.user._id
        let idHotel = room.hotelId
        if (methodOfPayload.userId.toString() !== req.user._id.toString()) return res.status(403).message({message: 'This is not your payment method'})
        let newReservation = new Reservation({
            userId: authorId, 
            hotelId:idHotel, 
            roomId:roomId, 
            methodOfPay:methodOfPay, 
            start:start, 
            end:end})
        await newReservation.save()
        await User.findOneAndUpdate(
            {_id: req.user._id},
            { $push: {reservation: newReservation._id}}
        )
        return res.status(200).send({ message: 'Reservation added successfully', newReservation})
    } catch (error) {
        console.error(error)
        return res.status(400).send({ message:'Error in function addReservation'})
    }
}
*/

export const addReservation = async (req, res) => {
    try {
        const { roomId, methodOfPay, start, end } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!roomId || !methodOfPay || !start || !end) {
            console.log('Faltan campos requeridos');
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Validar que la fecha de inicio no sea menor que la fecha de final
        if (new Date(start) >= new Date(end)) {
            console.log('Fecha de inicio no es menor que la fecha de final');
            return res.status(400).send({ message: 'Start date must be before end date' });
        }

        // Verificar si la habitación existe
        const room = await Room.findById(roomId);
        if (!room) {
            console.log('Habitación no encontrada');
            return res.status(404).send({ message: 'Room not found' });
        }

        // Verificar si hay alguna reserva existente para esa habitación y esas fechas
        const existingReservation = await Reservation.findOne({
            roomId,
            $or: [
                { start: { $gte: start, $lte: end } }, // La nueva reserva comienza durante una reserva existente
                { end: { $gte: start, $lte: end } },   // La nueva reserva termina durante una reserva existente
                { $and: [{ start: { $lte: start } }, { end: { $gte: end } }] } // La nueva reserva está completamente dentro de una reserva existente
            ]
        });

        if (existingReservation) {
            console.log('Ya existe una reserva para estas fechas');
            return res.status(400).send({ message: 'This room is already reserved for the specified dates' });
        }

        // Verificar si el método de pago existe
        const methodOfPayDoc = await MethodOfPay.findById(methodOfPay);
        if (!methodOfPayDoc) {
            console.log('Método de pago no encontrado');
            return res.status(404).send({ message: 'Method of payment not found' });
        }

        // Verificar que el método de pago pertenece al usuario actual
        if (methodOfPayDoc.userId.toString() !== req.user._id.toString()) {
            console.log('El método de pago no pertenece al usuario actual');
            return res.status(403).send({ message: 'This is not your payment method' });
        }

        const authorId = req.user._id;
        const idHotel = room.hotelId;

        // Crear la nueva reserva
        const newReservation = new Reservation({
            userId: authorId,
            hotelId: idHotel,
            roomId,
            methodOfPay,
            start,
            end
        });

        await newReservation.save();

        // Actualizar el usuario con la nueva reserva
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { reservations: newReservation._id } }
        );

        console.log('Reserva creada con éxito');
        return res.status(201).send({ message: 'Reservation added successfully', newReservation });
    } catch (error) {
        console.error('Error en la función addReservation:', error);
        return res.status(500).send({ message: 'Error in function addReservation', error: error.message });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        let idReservation = req.params.id
         let reservationDelete = await Reservation.findById(idReservation) 
        if (!reservationDelete) return res.send({ message: 'Reservation not found' })
        if (reservationDelete.userId.toString() !== req.user._id.toString()) return res.send({ message: 'You dont have permission to delete this reservation'})
        await Reservation.findOneAndDelete({_id: idReservation}).
        populate({path: 'userId', select: 'name surname -_id'}).
        populate({path: 'hotelId', select: 'name -_id'}).
        populate({path: 'roomId', select: 'date -_id'})
        await User.findOneAndUpdate(
            {_id: req.user._id},
            { $pull: {reservation: idReservation}}
        )
        await Room.findOneAndUpdate(
            {_id: reservationDelete.roomId},
            { $pull: {reservation: idReservation}}
        )
        await MethodOfPay.findOneAndUpdate(
            {_id: reservationDelete.methodOfPay},
            { $pull: {reservation: idReservation}}
        )
        return res.status(200).send({ message: 'Your reservation was deleted successfully', reservationDelete})
    } catch (error) {
        console.error(error)
        return res.status(400).send({ message:'Error in function deleteReservation'})
    }
}

export const listReservations = async (req, res) => {
    try {
        let idUser = req.user._id
        let reservations = await Reservation.find({userId: idUser}).
            populate({path: 'userId', select: 'name surname -_id'}).
            populate({path: 'hotelId', select: 'name -_id'}).
            populate({path: 'roomId', select: 'date -_id'}).
            populate({path: 'methodOfPay', select: 'cardHolder -_id'})
        if (!reservations) return res.status(404).send({ message: 'You are not authorized to list this reservations or reservations not found'});
        return res.status(200).send({ message: 'Your reservations were listed successfully', reservations})
    } catch (error) {
        console.error(error)
        return res.status(400).send({ message:'Error in function listReservations'})
    }
}

export const searchReservations = async (req, res) => {
    try {
        let searchReservations = req.body.search
        if (!searchReservations) return res.status(404).send({ message: 'Search term is required in the request body' })
        const regex = new RegExp(searchReservations, 'i')
        let Iduser = req.user._id
        let hotels = await Hotel.find({name: {$regex: regex}})
        if (!hotels || hotels.length === 0) return res.status(404).send({ message: 'Hotels not found' })
        let hotelIds = hotels.map(hotel => hotel._id)
        let reservations = await Reservation.find({hotelId: {$in: hotelIds}, userId: Iduser}).
            populate({path: 'hotelId', select: 'name -_id'}).
            populate({path: 'roomId', select: 'date -_id'}).
            populate({path: 'userId', select: 'name surname -_id'}).
            populate({path: 'methodOfPay', select: 'cardHolder -_id'})
        if (!reservations || reservations.length === 0) return res.status(404).send({ message: 'Reservation not found'})
        return res.status(200).send({ message: 'Reservations found successfully', reservations})
    } catch (error) {
        console.error(error)
        return res.status(400).send({ message:'Error in function searchReservations'})
    }
}

export const listReservationsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: 'Invalid user ID format' });
        }

        const reservations = await Reservation.find({ user: userId })
            .populate({ path: 'hotel', select: 'name -_id' })
            .populate({ path: 'room', select: 'description imageUrl -_id' });

        if (!reservations || reservations.length === 0) {
            return res.status(404).send({ message: 'Reservations not found for this user ID' });
        }

        return res.status(200).send({ message: 'Reservations found successfully', reservations });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error finding reservations', error });
    }
};

export const getHotelsWithMostReservations = async (req, res) => {
    try {
        const reservations = await Reservation.aggregate([
            {
                $group: {
                    _id: '$hotelId',
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'hotels',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'hotel'
                }
            },
            {
                $unwind: '$hotel'
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 5 
            },
            {
                $project: {
                    _id: 0,
                    name: '$hotel.name',
                    reservations: '$count' // Añadir el campo de reservaciones
                }
            }
        ])
        return res.status(200).send(reservations);
    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: 'Error retrieving hotels with most reservations' });
    }
}

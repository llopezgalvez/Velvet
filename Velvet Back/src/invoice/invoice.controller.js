'use strict'
import Invoice from './invoice.model.js'
import Reservation from '../reservation/reservation.model.js'
import Event  from '../event/event.model.js'
import MethodOfPay from '../methodOfPay/methodOfPay.model.js'
import Room from '../room/room.model.js'

export const test = async(req, res)=>{
    try {
        return res.send({message:'Invoice running...'})        
    } catch (error) {
        console.error(error)
    }
}

export const generated = async(req, res)=>{
    try {
        let data = req.body
        let {_id} = req.user
        let {id} = req.params
        data.date = new Date()
        data.user = _id
        //Se busca la reservacion del usuario y se asigna los valores de la factura
        let reservationIn = await Reservation.findOne({userId: _id, roomId:id})
        if(!reservationIn) return res.send({message: 'without reservation, invoice could not be generated'})
        //Se busca el precio del cuarto
        let room = await Room.findOne({_id: id})
        data.reservation = {
            idReservation : reservationIn._id,
            subTotalRe : room.price
        }
        //Se busca el evento del usuario y se asigna a data
        //Se busca el hotel apartir del cuarto 
        let hotel = room.hotelId
        let eventIn = await Event.findOne({user:_id , hotel: hotel})
        console.log(eventIn);
        console.log(_id, hotel)
        if(!eventIn) return res.send({message: 'without event, invoice could not be generated'})
        data.event = {
            idEvent: eventIn._id,
            subTotalEv: eventIn.price
        }
        //Se busca el metodo de pago del usuario y se asigna a data
        //Se busca el metodo de pago de el usuario en la reservacion
        let card = reservationIn.methodOfPay
        let payMethodIn = await MethodOfPay.findOne({_id: card})
        if(!payMethodIn) return res.send({message: 'without method of pay, invoice could not be generated'})
        data.payMethod = payMethodIn._id
        //Se calcula el todal sumando cada subtotal de la resevacion y evento
        data.total = data.reservation.subTotalRe + data.event.subTotalEv
        let invoice = new Invoice(data)
        invoice.save()
        return res.send({message:'Invoice generated successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'Error generating invoice', error})
    }
}

export const myInvoices = async(req, res)=>{
    try {
        let {id} = req.user
        let invoice = await Invoice.find({user:id})
        return res.send(invoice)
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'Error displaying your invoices', error})
    }
}
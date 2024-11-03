'use strict'
import Hotel from "./hotel.model.js"
import Review from '../Review/review.model.js'


export const test = async(res, req)=>{
    try {
        return req.send({message:'CRUD hoteles funcionando'})
    } catch (error) {
        console.error(error)        
    }
}

export const add = async(req, res)=>{
    try {
        let data = req.body
        let featured_services = {
            wifi: data.wifi,
            petFriendly: data.petFriendly,
            pool_Spa: data.pool_Spa,
            gym: data.gym,
            daily_Housekeeping: data.daily_Housekeeping
        };
        // Asignar el objeto de servicios al objeto de datos
        data.featured_services = featured_services;
        // Crear un nuevo documento de hotel con los datos proporcionados
        let hotel = new Hotel(data);
        // Guardar el hotel en la base de datos
        await hotel.save();
        // Enviar respuesta de éxito
        return res.send({message: 'You have successfully added'});
    } catch (error) {
        // Enviar respuesta de error en caso de fallo
        return res.status(500).send({message: 'Error registering hotel', error});
    }
}

export const update = async(req, res)=>{
    try {
        let {id} = req.params
        let data = req.body
        data.featured_services = {
            wifi: data.wifi,
            petFriendly: data.petFriendly,
            pool_Spa: data.pool_Spa,
            gym: data.gym,
            daily_Housekeeping: data.daily_Housekeeping
        };
        let updatedHotel = await Hotel.findOneAndUpdate(
            {_id:id},
            data,
            {new: true}
        ).populate('category',['name']).populate('review',['stars','description','user'])
        if(!updatedHotel) return res.status(401).send({message: 'Hotel not found and not updated' })
        return res.send(updatedHotel)
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'Error updating hotel', error})
    }
} 

export const deleteHotel = async(req, res)=>{
    try {
        let {id} = req.params
        let deletedHotel = await Hotel.findOneAndDelete({_id:id})
        if(!deletedHotel) return res.status(401).send({message:'Hotel not found and not deleted'})
        await Review.deleteMany({hotel: id})
        return res.send({message:`Hotel with name ${deletedHotel.name} was deleted successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting hotel', error})
    }
}

export const display = async(req, res)=>{
    try {
        let hotels = await Hotel.find().populate('review',['stars','description','user'])
        return res.send(hotels)
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'Error displaying hotels', error})
    }
}

export const HotelId = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        res.json(hotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
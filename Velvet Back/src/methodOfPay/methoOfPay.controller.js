'use strict'
import methodOfPayModel from './methodOfPay.model.js'
import User from '../user/user.model.js'

export const addMethodOfPay = async (req, res) => {
    try {
        let data = req.body
        if (!data) return res.send({message: 'Please fill in all the fields of the payment method.'})
        let userAuthor = req.user._id
        if (data.cardNumber.length !== 16) return res.status(400).send({message: 'Invalid card number, must be 16 characters'})
        let currentDate = new Date()
        let expirationDate = new Date(data.expirationDate)
        if(expirationDate <= currentDate) return res.status(400).send({message: 'Your card has expired'})
        if(data.securityCode.length !== 3 && data.securityCode.length !==4) return res.status(400).send({message: 'Invalid security code'})
        let methodOfPay = new methodOfPayModel({userId:userAuthor, ...data})
        await methodOfPay.save()
        await User.findOneAndUpdate(
            {_id: userAuthor},
            {$push: {methodOfPay: methodOfPay._id}}
        )
        return res.status(200).send({msg: 'The method of payment has been added successfully', methodOfPay})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error in function.'})
    }
}

export const deletedMethodOfPay = async (req, res) => {
    try {
        let {id} = req.params
        let methodOfPay = await methodOfPayModel.findOne({_id:id})
        if(!methodOfPay) return res.status(401).send({message:'Method of payment not found'})
        if (methodOfPay.userId.toString() !== req.user._id.toString()) return res.status(403).message({message: 'This is not your payment method'})
        await methodOfPayModel.findByIdAndDelete(id)
        await User.findOneAndUpdate(
            {_id: methodOfPay.userId},
            {$pull: {methodOfPay: id}}
        )
        return res.status(200).send({msg: 'The method of payment has been deleted successfully', deletedMethodOfPay})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error in function.'})
    }
}

export const listMethodsOfPayment = async (req, res) => {
    try {
        let methodsOfPay = await methodOfPayModel.find({userId: req.user._id})
            .select('cardHolder expirationDate userId reservation -_id')
            .populate({path: 'userId', select: 'name surname -_id'})
        if (methodsOfPay.length == 0) return res.status(404).send({message: 'Not found methods of payment'})
        return res.send({methodsOfPay})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error in function.'})
    }
}
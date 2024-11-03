'use strict'
import { Schema, model} from "mongoose"

const methodOfPayloadSchema = Schema({
    cardHolder: {
        type: String, 
        required: true
    }, 
    cardNumber: {
        type: Number, 
        required: true
    }, 
    securityCode: {
        type: Number, 
        required: true
    }, 
    expirationDate: {
        type: Date, 
        required: true
    }, 
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'user', 
        required: true
    }, 
}, {
    versionKey: false
})

export default model('methodOfPayload', methodOfPayloadSchema)
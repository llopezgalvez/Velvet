'use strict'

import { Schema, model } from "mongoose"

const eventSchema = Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    hotel: {
        type: Schema.ObjectId,
        ref: 'hotel',
        required: true
    },
    typeEvent: {
        type: String,
        required: true
    },
    servicesAdditional: {
        type: String,
    },
    price:{
        type:Number,
        required: true
    }
}, {
    versionKey: false
})

export default model('event', eventSchema)
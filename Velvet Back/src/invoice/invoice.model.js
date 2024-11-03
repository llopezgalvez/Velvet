import { Schema, model } from "mongoose";

const invoiceSchema = new Schema({
    date:{
        type:Date,
        required: true
    },
    user:{
        type:Schema.ObjectId,
        ref: 'user',
        required: true
    },
    reservation:{
        idReservation:{
            type:Schema.ObjectId,
            ref: 'reservation',
            required: true
        },
        subTotalRe:{
            type:Number,
            required: true
        }
    },
    event:{
        idEvent:{
            type: Schema.ObjectId,
            ref:'event'
        },
        subTotalEv:{
            type:Number,
            required: true
        }
    },
    payMethod:{
        type: Schema.ObjectId,
        ref: 'methodOfPayload',
        required: true
    },
    total:{
        type:Number,
        required: true
    }
    

},
    {versionKey: false}
)

export default model('invoice', invoiceSchema)
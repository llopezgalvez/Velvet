import {model, Schema} from 'mongoose'

const roomSchema = Schema({
    capacity:{
        numberOfAdults:{
            type: Number, 
            require: true,
            default: 1
        },
        numberOfChildren:{
            type: Number, 
            require: true,
            default: 0
        },
        numberOfPets: {
            type: Number, 
            require: true,
            default: 0
        },
        amountOfRooms: {
            type: Number, 
            require: true,
            default: 1
        }
    }, 
    imgs:[{
        type:String
    }],
    price:{
        type: Number,
        require: true,
    },
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: 'hotel',
        require: true
    },
}, {
    versionKey: false
    }
)

export default model('room', roomSchema);


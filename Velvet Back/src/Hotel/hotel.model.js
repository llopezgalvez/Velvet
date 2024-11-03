 import { Schema, model} from "mongoose";

const hotelSchema = new Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    phone:{
        type:Number,
        minLength:[8,'Enter a valid phone number'],
        required: true,
        unique: true
    },
    address:{
        type:String,
        required: true,
        unique: true

    },
    country:{
        type:String,
        required: true
    },
    stars:{
        type:Number,
        enum:[1,2,3,4,5],
        required: true
    },
    description:{
        type:String,
        required: true,
        minLength: [10, 'this description is too short']
    },
    category:{
        type: Schema.ObjectId,
        ref: 'category',
        required: true
    },
    featured_services:{
        wifi:{
            type:String,
            required:true,
            enum:["Y","N"],
            upperCase:true,
        },
        petFriendly:{
            type:String,
            required:true,
            enum:["Y","N"],
            upperCase:true,
        },
        pool_Spa:{
            type:String,
            required:true,
            enum:["Y","N"],
            upperCase:true,
        },
        gym:{
            type:String,
            required:true,
            enum:["Y","N"],
            upperCase:true,
        },
        daily_Housekeeping:{
            type:String,
            required:true,
            enum:["Y","N"],
            upperCase:true,
        }
    },
    mainImg:{
        type:String,
        required: true
    },
    imgs:[{
        type:String
    }],
    review:[{
            type:Schema.ObjectId,
            ref:'review',
    }]
},
    {
        versionKey:false
    }
)

export default model('hotel', hotelSchema)
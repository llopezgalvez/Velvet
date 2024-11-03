import {Schema, model} from "mongoose"

const reviewSchema = Schema({
    stars:{
        type:Number,
        enum:[1,2,3,4,5],
        required: true
    },
    description:{
        type:String,
        required: true,
    },
    user:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    hotel:{
        type: Schema.ObjectId,
        ref: 'hotel',
        required: true
    }
},
    {
        versionkey:false
    }

)

export default model('review', reviewSchema)
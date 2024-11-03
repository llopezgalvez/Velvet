import { model, Schema } from "mongoose";

const reservationSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: "hotel",
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "room",
      required: true,
    },
    start:{
      type: Date,
      required: true,
    },
    end:{
      type: Date,
      required: true,
    },
    methodOfPay: {
      type: Schema.Types.ObjectId,
      ref: "methodOfPayload",
      required: true,
    }
  },{
    versionKey: false,
  }
)

export default model("reservation", reservationSchema);

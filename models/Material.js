import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema(
    {
        materialCode: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        avgConsumption: {
            type: Number,
            required: true
        },
        reqForThreeMonths: {
            type: Number,
            required: true
        },
        actualReqForThree: {
            type: Number,
            required: true
        },
        stockInHand: {
            type: Number,
            required: true
        },
        daysLeft: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Material = mongoose.model("Material", MaterialSchema);
export default Material;
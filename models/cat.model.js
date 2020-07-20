const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const catSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: Array,
        required: false,
    },
    address: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
        },
        formattedAddress: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Cat = mongoose.model("Cat", catSchema);
module.exports = Cat;
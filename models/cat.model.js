const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const catSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    // imgUrl: String,
    imgUrls: [{
        path: String,
        featured: Boolean
    }],
    // location: {
    //     type: {
    //         type: String,
    //         enum: ["Point"],
    //     },
    //     coordinates: {
    //         type: [Number],
    //         index: "2dsphere",
    //     },
    //     formattedAddress: String,
    // },
    lastSeen: {
        type: Date,
        default: Date.now,
    },
    lastFed: {
        type: Date,
        default: Date.now,
    },
})

const Cat = mongoose.model("Cat", catSchema);
module.exports = Cat;
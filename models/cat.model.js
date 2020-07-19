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
    location: {
        type: String,
        required: true,
    }
})

const Cat = mongoose.model("Cat", catSchema);
module.exports = Cat;
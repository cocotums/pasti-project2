const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imgUrl: String,
    // {
    //     profilePic: {
    //         type: Image,
    //         default: 
    //     }
    // },
    //     // isAdmin: {
    //     type: Boolean,
    //     default: false,
    // },

});

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
    // bcrypt.compare(password, this.password).then((result) => {
    //   return result;
    // });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
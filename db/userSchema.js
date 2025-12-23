const mongoose = require("mongoose")

const { Schema } = mongoose

const user = new Schema({
    name: {

        type: String,
        required: true,

    },
    email: {

        type: String,
        required: true,

    },
    password: {

        type: String,
        required: true,

    }
});


const userValue = mongoose.model("userMails", user);
module.exports = userValue;

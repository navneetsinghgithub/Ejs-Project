const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name:
        { type: String },
    lastname:
        { type: String },
    email:
        { type: String },
    password:
        { type: Number },
    contact:
        { type: Number },
    image:
        { type: String },
}, { timestamps: true })

const users = mongoose.model("users", userSchema)
module.exports = users
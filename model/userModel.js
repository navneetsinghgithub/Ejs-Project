const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name:
        { type: String },
    lastname:
        { type: String },
    email:
        { type: String },
    password:
        { type: String },
    contact:
        { type: Number },
    image:
        { type: String },
    role:
        { type: Number, enum: [0, 1], default: 1 },   //admin = 0 , user = 1  
    status:
        { type: Boolean, default: false },  //inactive = 0 , active = 1
    token:
        { type: String },
    logintime:
        { type: Number }
}, { timestamps: true })

const users = mongoose.model("users", userSchema)
module.exports = users
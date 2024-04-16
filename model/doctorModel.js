const mongoose = require("mongoose")
const doctorSchema = new mongoose.Schema({
    name:
        { type: String },
    age:
        { type: Number },
    phone:
        { type: Number },
    image:
        { type: String },
    email:
        { type: String },
    fees:
        { type: Number },


}, { timestamps: true })
const doctor = mongoose.model("doctor", doctorSchema)
module.exports = doctor
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
    role:
        { type: Number, enum: [0, 1], default: 1 },  // 0 = ent ,  1= nerologist
}, { timestamps: true })
const doctor = mongoose.model("doctor", doctorSchema)
module.exports = doctor
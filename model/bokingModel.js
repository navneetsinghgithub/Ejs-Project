const mongoose = require("mongoose")
const bokingSchema = new mongoose.Schema({
    doctorId:
        { type: mongoose.Schema.Types.ObjectId, ref: "doctor" },
    patientName:
        { type: String },
    date:
        { type: String },
    title:
        { type: String },
    fees:
        { type: Number },
    status:
        { type: String },   //Reject = 0 , accept = 1

}, { timestamps: true })
const boking = mongoose.model("boking", bokingSchema)
module.exports = boking
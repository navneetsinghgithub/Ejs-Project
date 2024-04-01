const mongoose = require("mongoose")
module.exports = () => {
    mongoose.connect("mongodb+srv://ejs123:ejs123@cluster0.uiawcor.mongodb.net/ejs").then((res) => {
        console.log(">>>successfully connected>>>");
    }).catch((error) => {
        console.log(error, "error");
    })
}
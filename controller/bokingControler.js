const bokingModel = require("../model/bokingModel")
const patientModel = require("../model/patientModel")
const doctorModel = require("../model/doctorModel")
const { imageupload } = require("../middleWare/helper")
const bcrypt = require("bcrypt")
const saltRound = 10





module.exports = {
    createBoking: async (req, res) => {
        try {
            // const doctorId = req.params.id
            // const patientId = req.session.users._id
            
            const dataBook = await bokingModel.create({
                doctorId: req.body.doctorId, patientName:req.body.patientName,
                date: req.body.date, status: req.body.status, title: req.body.title,fees:req.body.fees
            })
          console.log(error,"error");
            res.redirect("/booking")
        } catch (error) {
            console.log(error, "error");
        }
    },

    getBoking: async (req, res) => {
        try {

            if (!req.session.users) {
                res.redirect("/loginPage")
            }
            const getData = await bokingModel.find().populate(['doctorId', 'patientId'])

            res.render("booking/boking", { getData, session: req.session.users })

        } catch (error) {
            console.log(error, "error");
        }
    },
    
    getSingleBoking: async (req, res) => {
        try {
            console.log(req.params, "====>==");
            if (!req.session.users) {
                res.redirect("/loginPage")
            }
            const getData = await bokingModel.findOne({
                _id: req.params.id
            })
            console.log(getData, "getDatagetDatagetData");
            return res.json({
                status: 200,
                message: "get single",
                body: getData
            })
            // res.render("booking/boking", { getData, session: req.session.users })

        } catch (error) {
            console.log(error, "error");
        }
    },

    //////////////////////////////////patient controller//////////////////////////
    addPatient: async (req, res) => {
        try {
            const password = await bcrypt.hash(req.body.password, saltRound)

            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image) req.body.image = imageupload(image, "userImage");
            }
            const data = await patientModel.create({
                name: req.body.name, age: req.body.age,
                image: req.body.image, phone: req.body.phone,
                email: req.body.email, password: password, status: req.body.status
            })
            return res.json({
                status: 200,
                message: "added patient succ",
                body: data
            })
        } catch (error) {
            console.log(error, "error");
        }
    },
    getPatient: async (req, res) => {
        try {
            const getData = await patientModel.find()
            return res.json({
                status: 200,
                message: "get patient succ",
                body: getData
            })
        } catch (error) {
            console.log(error, "error");
        }
    },

    ///////////////////////////////Doctor Controller/////////////////////
    addDoctor: async (req, res) => {
        try {
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image) req.body.image = imageupload(image, "userImage");
            }
            const data = await doctorModel.create({
                name: req.body.name, age: req.body.age,
                image: req.body.image, phone: req.body.phone, status: req.body.status, fees: req.body.fees,
                doctorId: req.body.doctorId
            })
            console.log(data, "====d==");
            res.redirect("/booking")
            console.log(data, "data");

        } catch (error) {
            console.log(error, "error");
        }
    },

    getDoctor: async (req, res) => {
        try {
            console.log(req.body,"========");
            const getData = await doctorModel.findById({_id:req.body.doctorId})
            res.send(getData)
            // console.log(getData,"getDatagetData");
        } catch (error) {
            console.log(error, "error");
        }
    }
}
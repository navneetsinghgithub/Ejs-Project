const userModel = require("../model/userModel")

module.exports = {

    signup: async (req, res) => {
        try {

            const data = await userModel.create({
                name: req.body.name, lastname: req.body.lastname, email: req.body.email,
                password: req.body.password, image: req.body.image, contact: req.body.contact
            })
            return res.json({
                success: true,
                status: 200,
                message: "user created",
                body: data
            })
        } catch (error) {
            console.log(error, "error");
            return res.json({
                success: false,
                status: 400,
                message: "error user not created",

            })
        }
    },
    getUser: async (req, res) => {
        try {
            const data = await userModel.find()
            return res.json({
                success: true,
                status: 200,
                message: "get all users success",
                body: data
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                status: 400,
                message: "error not get users"
            })
        }
    },
    getSingleUser: async (req, res) => {
        try {
            const data = await userModel.findById({
                _id: req.params.id
            })
            return res.json({
                success: true,
                status: 200,
                message: "get single users success",
                body: data
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                status: 400,
                message: "error not get users"
            })
        }
    },
    updateUser: async (req, res) => {
        try {
            const data = await userModel.findByIdAndUpdate({
                _id: req.params.id
            }, {
                name: req.body.name, lastname: req.body.lastname,
                email: req.body.email, password: req.body.password, image: req.body.image
            }, { new: true })
            return res.json({
                success: true,
                status: 200,
                message: "update users success",
                body: data
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                status: 400,
                message: "error not update users"
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const data = await userModel.findByIdAndDelete({
                _id: req.params.id
            })
            return res.json({
                success: true,
                status: 200,
                message: "delete single users success",
                body: data
            })
        } catch (error) {
            console.log(error, "error")
            return res.json({
                success: false,
                status: 400,
                message: "error user not deleted"
            })
        }
    },

}
const { json } = require("express")
const { tokenGenerate } = require("../jwt/jsonWebToken")
const userModel = require("../model/userModel")
const { imageupload, checkValidation } = require("../middleWare/helper")
const bcrypt = require("bcrypt")
const { Validator } = require("node-input-validator")
const saltRound = 10
module.exports = {

    signup: async (req, res) => {
        try {
            const v = new Validator(req.body, {
                name: "required",
                email: "required",
                password: "required"
            })
            let errorResponse = await checkValidation(v)
            if (errorResponse) {
                return res.json({
                    success: false,
                    status: 404,
                    message: errorResponse,
                    body: {}
                })
            }

            const email = await userModel.findOne({
                email: req.body.email,
            })
            if (email) {
                return res.json({
                    success: false,
                    status: 400,
                    message: "email already exist",
                    body: {}
                })
            }
            const contact = await userModel.findOne({
                contact: req.body.contact
            })
            if (contact) {
                return res.json({
                    success: false,
                    status: 400,
                    message: "contact number already exist",
                    body: {}
                })
            }


            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image) req.body.image = imageupload(image, "userImage");
            }

            const password = await bcrypt.hash(req.body.password, saltRound)
            const data = await userModel.create({
                name: req.body.name, lastname: req.body.lastname, email: req.body.email,
                password: password, image: req.body.image, contact: req.body.contact, role: req.body.role,
                status: req.body.status
            })
            const token = await tokenGenerate(data._id)
            const updateResult = await userModel.findByIdAndUpdate({
                _id: data._id
            }, { token: token.token, logintime: token.time }, { new: true })

            return res.json({
                success: true,
                status: 200,
                message: "user created",
                body: updateResult
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

    login: async (req, res) => {
        try {
         
            let login = await userModel.findOne({ email: req.body.email })
            if (!login) {
             
                res.redirect('/loginPage')
            }
            else if (login.isVerified === 0) {
               
                res.redirect('/loginPage')
            }

            const password = await bcrypt.compare(req.body.password, login.password);         
            if (!password) {
              
                res.redirect('/loginPage')
            } else {
                req.session.users = login
                req.flash("msg", "Login successfully")
                res.redirect("/dashboard")
            }

        } catch (error) {
            console.log(error, "error");
        }

    },

    getAdminProfile: async (req, res) => {
        try {

            const getProfile = await userModel.findById({
                _id: req.params.id
            })
            return res.json({
                success: true,
                status: 200,
                message: " get profile successful",
                body: getProfile
            })
        } catch (error) {
            return res.json({
                success: false,
                status: 400,
                message: "error",
            })
        }
    },

    updateAdminProfile: async (req, res) => {
        try {

            if (!req.session.users || !req.session.users._id) {
                return helper.failed(res, "User session not found or missing _id");
              }

            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image) req.body.image = imageupload(image, "userImage");
            }

   
            const updateAdminProfile = await userModel.findByIdAndUpdate({
                _id: req.session.users._id
            }, { name: req.body.name, image: req.body.image, contact: req.body.contact }, { new: true })

            //////////////////////////
            let login = await userModel.findOne({ _id: req.session.users._id })
                req.session.users = login
         
            res.redirect("/dashboard")
            console.log("updated admin profile");
           
        } catch (error) {
            console.log(error);
          
        }
    },

    getUser: async (req, res) => {
        try {
            if(!req.session.users){
            res.redirect("/loginPage")
            }
            let Data = await userModel.find({role:1})
            // console.log("=======data",Data);return
            res.render("common/user",{Data})
        } catch (error) {
            console.log(error)
       
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
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image) req.body.image = imageupload(image, "userImage");
            }

            const data = await userModel.findByIdAndUpdate({
                _id: req.params.id
            }, {
                name: req.body.name, lastname: req.body.lastname,
                email: req.body.email, password: req.body.password, image: req.body.image, contact: req.body.contact
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

    changePassword: async (req, res) => {
        try {
            const data = await userModel.findOne({ _id: req.session.users._id })
            const decryptPassword = await bcrypt.compare(req.body.password, data.password)
            if (decryptPassword == false) {
                console.log("password does not match");
            
            }
            if (req.body.newPassword !== req.body.confirmPassword) {
                console.log("new password and confirm password does not match");
           
            }
            const encryptPassword = await bcrypt.hash(req.body.newPassword, saltRound)
            data.password = encryptPassword
            data.save()
            console.log("password updated successfully");
          
        } catch (error) {
            console.log(error, "error");
         
        }

    },

    logout: async (req, res) => {
        try {

            delete req.session.users
            res.redirect('/loginPage')
        } catch (error) {
            return res, json({
                success: false,
                status: 400,
                message: "error"
            })
        }
    },

    status: async (req, res) => {
        try {
            const status = await userModel.findByIdAndUpdate({
                _id: req.session.users._id
            }, { status: req.body.status }, { new: true })
         console.log("status updated");
        } catch (error) {
            console.log(error, "error");
          
        }
    }

}
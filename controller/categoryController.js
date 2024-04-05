const categoryModel = require("../model/categoryModel")
const { Validator } = require("node-input-validator")
const { imageupload, checkValidation } = require("../middleWare/helper")

module.exports = {
    createCategory: async (req, res) => {
        try {

            const v = new Validator(req.body, {
                name: "required",
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


            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image) req.body.image = imageupload(image, "userImage");
            }
            const data = await categoryModel.create({
                name: req.body.name, image: req.body.image
            })
            console.log("add data");
           
        } catch (error) {
          console.log("error");
        }
    },

    findCategory: async (req, res) => {
        try {
            const data = await categoryModel.find()

            return res.json({
                success: true,
                status: 200,
                message: "find data",
                body: data
            })
        } catch (error) {
            return res.json({
                success: false,
                status: 400,
                message: "error",
            })
        }
    },

    findSingleCategory: async (req, res) => {
        try {
            const data = await categoryModel.findById({
                _id: req.params.id
            })

            return res.json({
                success: true,
                status: 200,
                message: "find Single Data ",
                body: data
            })
        } catch (error) {
            return res.json({
                success: false,
                status: 400,
                message: "error",
            })
        }
    },
    
    updateCategory: async (req, res) => {
        try {
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image) req.body.image = imageupload(image, "userImage");
            }
            const data = await categoryModel.findByIdAndUpdate({
                _id: req.params.id
            }, { name: req.body.name, image: req.body.image }, { new: true })

            return res.json({
                success: true,
                status: 200,
                message: " updated Data ",
                body: data
            })
        } catch (error) {
            return res.json({
                success: false,
                status: 400,
                message: "error",
            })
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const data = await categoryModel.findByIdAndDelete({
                _id: req.params.id
            }, { new: true })

            return res.json({
                success: true,
                status: 200,
                message: " delete  Data ",
                body: data
            })
        } catch (error) {
            return res.json({
                success: false,
                status: 400,
                message: "error",
            })
        }
    },
}
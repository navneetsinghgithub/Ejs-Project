const cms = require("../model/cmsModel");
const cmsModel = require("../model/cmsModel")

module.exports = {
    createCms: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.render("/login", { session: req.session.users })
            }
            const data = await cmsModel.create({
                title: req.body.title, content: req.body.content, type: req.body.type
            })
            console.log("cms created success");
        } catch (error) {
            console.log("error not create cms");
        }
    },

    // TermC: async (req, res) => {
    //     try {
    //         const data = await cmsModel.findOne({
    //             type: 1
    //         })
    //         return res.json({
    //             success: true,
    //             status: 200,
    //             message: "find term & condition ",
    //             body: data
    //         })
    //     } catch (error) {
    //         return res.json({
    //             success: false,
    //             status: 400,
    //             message: "error",
    //         })
    //     }
    // },

    // privacyP: async (req, res) => {
    //     try {
    //         const data = await cmsModel.findOne({
    //             type: 2
    //         })
    //         return res.json({
    //             success: true,
    //             status: 200,
    //             message: "find privacy policy ",
    //             body: data
    //         })
    //     } catch (error) {
    //         return res.json({
    //             success: false,
    //             status: 400,
    //             message: "error",
    //         })
    //     }
    // },

    // aboutUs: async (req, res) => {
    //     try {
    //         const data = await cmsModel.findOne({
    //             type: 3
    //         })
    //         return res.json({
    //             success: true,
    //             status: 200,
    //             message: "find about us ",
    //             body: data
    //         })
    //     } catch (error) {
    //         return res.json({
    //             success: false,
    //             status: 400,
    //             message: "error",
    //         })
    //     }
    // },

    updateTermCms: async (req, res) => {
        try {
            const data = await cmsModel.findOneAndUpdate({
                type: 1
            }, {
                title: req.body.title,
                content: req.body.editor1
            }, { new: true })
            res.redirect('/termConditionPage')
        } catch (error) {
            console.log(error);
        }
    },

    updatePrivacyCms: async (req, res) => {
        try {
            const data = await cmsModel.findOneAndUpdate({
                type: 2
            }, { title: req.body.title, content: req.body.editor1 }, { new: true })
            res.redirect("/privacyPolicy")
        } catch (error) {
            console.log(error);
        }
    },

    updateAboutCms: async (req, res) => {
        try {
            const data = await cmsModel.findOneAndUpdate({
                type: 3
            }, { title: req.body.title, content: req.body.editor1 }, { new: true })
            res.redirect("/aboutUss")
        } catch (error) {
            console.log(error);
        }
    },

}
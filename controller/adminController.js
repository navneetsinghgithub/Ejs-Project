const { redirect } = require("react-router-dom");
const cmsModel = require("../model/cmsModel")
const userModel = require("../model/userModel")
const categoryModel = require("../model/categoryModel")
const subcategoryModel = require("../model/subCategoryModel");
const session = require("express-session");
const { addSubCategory } = require("./subCategoryController");


module.exports = {

  dashboard: async (req, res) => {
    try {
      if (!req.session.users) {
        return res.redirect("/loginPage")
      }
      const msg = req.flash("msg");
      res.render("common/dashboard", { session: req.session.users, msg });
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  },

  loginPage: async (req, res) => {
    try {
      const msg = req.flash("msg");
      res.render("users/Login", { msg })
    } catch (error) {
      console.log(error);
    }
  },

  profile: async (req, res) => {
    try {
      if (!req.session.users) {
        return res.redirect("/loginPage")
      }
      res.render("common/profile", { session: req.session.users })
    } catch (error) {
      console.log(error);
    }
  },

  editProfile: async (req, res) => {
    try {
      if (!req.session.users) {
        return res.redirect("/loginPage")
      }
      res.render("common/editProfile", { session: req.session.users })
    } catch (error) {
      console.log(error);
    }
  },

  changePasswordPage: async (req, res) => {
    try {
      if (!req.session.users) {
        return res.redirect("/loginPage")
      }
      const msg = req.flash("msg");
      res.render("users/ChangePassword.ejs", { session: req.session.users, msg })
    } catch (error) {
      console.log(error);
    }
  },


  userView: async (req, res) => {
    try {
      // console.log(req.params,"====================",req.body);return;

      if (!req.session.users) {
        return res.redirect("/loginPage")
      }
      let Data = await userModel.findOne({ _id: req.params.id })
      res.render("common/userView", { session: req.session.users, Data })
    } catch (error) {
      console.log(error, "error");
    }
  },

  ////////////////////cms///////////////////
  termConditionPage: async (req, res) => {
    try {
      if (!req.session.users) {
        return res.render("/login")
      }
      let data = await cmsModel.findOne({
        type: 1
      })
      res.render("cms/termCondition", { session: req.session.users, data })
    } catch (error) {
      console.log(error);
    }
  },

  privacyPolicy: async (req, res) => {
    try {
      const data = await cmsModel.findOne({
        type: 2
      })
      res.render("cms/privacyPolicy", { session: req.session.users, data })
    } catch (error) {
      console.log(error);
    }
  },

  aboutUss: async (req, res) => {
    try {
      const data = await cmsModel.findOne({
        type: 3
      })
      res.render("cms/aboutUs", { session: req.session.users, data })
    } catch (error) {
      console.log(error);
    }
  },



  /////////////////////////////Category/////////////////////
  addCategory: async (req, res) => {
    try {
      if (!req.session.users) {
        return res.redirect("/loginPage")
      }
      res.render("category/addCategory", { session: req.session.users })
    } catch (error) {
      console.log(error, "error");
    }
  },


  categoryView: async (req, res) => {
    try {

      if (!req.session.users) {
        return res.redirect("/loginPage")
      }
      const Data = await categoryModel.findOne({ _id: req.params.id })
      res.render("category/categoryView", { Data, session: req.session.users })
    } catch (error) {
      console.log(error, "error");
    }
  },

  editCategory: async (req, res) => {
    try {
      const data = await categoryModel.findById({
        _id: req.params.id
      })

      if (!req.session.users) {
        return res.redirect("/loginPage")
      }
      res.render("category/editCategory", { session: req.session.users, data })
    } catch (error) {
      console.log(error, "error");
    }
  },

  addSubCategory: async (req, res) => {
    try {
      if (!req.session.users) {
        return res.redirect("/loginPage")
      }
      const DataCategory = await subcategoryModel.find();
      res.render("category/addSubCategory", { session: req.session.users, DataCategory })
    } catch (error) {
      console.log(error, "error");
    }
  },


  subCategoryView: async (req, res) => {
    try {
      if (!req.session.users) {
        return res.redirect("/loginPage")
      }
      const Data = await subcategoryModel.findOne({ _id: req.params.id }).populate("categoryId")
      res.render("category/subCategoryView", { Data, session: req.session.users })
    } catch (error) {
      console.log(error, "error");
    }
  },

  editSubCategory: async (req, res) => {
    try {

      const DataCategory = await subcategoryModel.find();
      // console.log(DataCategory,"DataCategory");
      const data = await subcategoryModel.findById({
        _id: req.params.id
      })
      console.log(data, "===============");
      if (!req.session.users) {
        return res.redirect("/loginPage")
      }
      res.render("category/editSubCategory", { session: req.session.users, data, DataCategory })
    } catch (error) {
      console.log(error, "error");
    }
  }


}
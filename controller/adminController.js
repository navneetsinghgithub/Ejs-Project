const { redirect } = require("react-router-dom");
const cmsModel = require("../model/cmsModel")

module.exports = {

  dashboard: async (req, res) => {
    try {
      if (!req.session.users) {
        return res.redirect("/loginPage")
      }
      res.render("common/dashboard", { session: req.session.users });
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  },

  loginPage: async (req, res) => {
    try {
      const msg = req.flash("msg");
      res.render("users/Login",{msg})
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
      res.render("users/ChangePassword.ejs", { session: req.session.users })
    } catch (error) {
      console.log(error);
    }
  },

  // user: async (req, res) => {
  //   try {
  //     res.render("common/user", { session: req.session.users })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },


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
  }

}
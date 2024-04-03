var express = require('express');
var router = express.Router();
const adminController = require("../controller/adminController");
const userController = require("../controller/userController");
const cmsController = require("../controller/cmsController")
const { auth } = require('../middleWare/auth');


////////////////////////////////admin///////////////
router.get("/dashboard",adminController.dashboard)
router.get("/loginPage", adminController.loginPage)
router.get("/changePasswordPage", adminController.changePasswordPage)
router.get("/termConditionPage",adminController.termConditionPage)
router.get("/privacyPolicy",adminController.privacyPolicy)
router.get("/aboutUss",adminController.aboutUss)
router.get("/profile",adminController.profile)
router.get("/editProfile",adminController.editProfile)
router.get("/user",adminController.user)







////////////////user//////////////////
router.post("/signup", userController.signup)
router.get("/getUser", auth, userController.getUser)
router.get("/getSingleUser/:id", userController.getSingleUser)
router.put("/updateUser/:id", userController.updateUser)
router.delete("/deleteUser/:id", userController.deleteUser)
router.post("/login", userController.login)
router.post("/changePassword/:id", userController.changePassword)
router.get("/logout", userController.logout)
router.get("/getAdminProfile/:id", userController.getAdminProfile)
router.put("/updateAdminProfile/:id", userController.updateAdminProfile)
router.put("/status/:id", userController.status)



///////////////CMS///////////////////
router.post("/createCms", cmsController.createCms)
router.get("/TermC", cmsController.TermC)
router.get("/privacyP", cmsController.privacyP)
router.get("/aboutUs", cmsController.aboutUs)
router.post("/updateTermCms", cmsController.updateTermCms)
router.post("/updatePrivacyCms", cmsController.updatePrivacyCms)
router.post("/updateAboutCms", cmsController.updateAboutCms)




module.exports = router;

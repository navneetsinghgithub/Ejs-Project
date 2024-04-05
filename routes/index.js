var express = require('express');
var router = express.Router();
const adminController = require("../controller/adminController");
const userController = require("../controller/userController");
const cmsController = require("../controller/cmsController")
const controllers = require("../controller/categoryController")
const controllerss = require("../controller/subCategoryController")
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
router.get("/userView/:id",adminController.userView)





////////////////user//////////////////
router.post("/signup", userController.signup)
router.get("/getUser",  userController.getUser)
router.get("/getSingleUser/:id", userController.getSingleUser)
router.put("/updateUser/:id", userController.updateUser)
router.post("/deleteUser", userController.deleteUser)
router.post("/login", userController.login)
router.post("/changePassword", userController.changePassword)
router.get("/logout", userController.logout)
router.get("/getAdminProfile/:id", userController.getAdminProfile)
router.post("/updateAdminProfile", userController.updateAdminProfile)
router.post("/status/:id", userController.status)



///////////////CMS///////////////////
router.post("/createCms", cmsController.createCms)
router.get("/TermC", cmsController.TermC)
router.get("/privacyP", cmsController.privacyP)
router.get("/aboutUs", cmsController.aboutUs)
router.post("/updateTermCms", cmsController.updateTermCms)
router.post("/updatePrivacyCms", cmsController.updatePrivacyCms)
router.post("/updateAboutCms", cmsController.updateAboutCms)


///////////category controller//////
router.post("/createCategory", controllers.createCategory)
router.get("/findCategory", controllers.findCategory)
router.get("/findSingleCategory/:id", controllers.findSingleCategory)
router.put("/updateCategory/:id", controllers.updateCategory)
router.delete("/deleteCategory/:id", controllers.deleteCategory)



///////////subCategory controller//////
router.post("/addSubCategory", controllerss.addSubCategory)
router.get("/findSubCategory", controllerss.findSubCategory)
router.get("/findSingleSubCategory/:id", controllerss.findSingleSubCategory)
router.put("/updateSubCategory/:id", controllerss.updateSubCategory)
router.delete("/deleteSubCategory/:id", controllerss.deleteSubCategory)


module.exports = router;

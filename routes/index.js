var express = require('express');
var router = express.Router();
const adminController = require("../controller/adminController");
const userController = require("../controller/userController");
const cmsController = require("../controller/cmsController")
const controllers = require("../controller/categoryController")
const controllerss = require("../controller/subCategoryController")
const { auth } = require('../middleWare/auth');
const bokingControler = require('../controller/bokingControler');


////////////////////////////////admin////////////////////////////////////////////////////////////////////////
router.get("/dashboard", adminController.dashboard)
router.get("/loginPage", adminController.loginPage)
router.get("/changePasswordPage", adminController.changePasswordPage)
router.get("/termConditionPage", adminController.termConditionPage)
router.get("/privacyPolicy", adminController.privacyPolicy)
router.get("/aboutUss", adminController.aboutUss)
router.get("/profile", adminController.profile)
router.get("/editProfile", adminController.editProfile)
router.get("/userView/:id", adminController.userView)
router.get("/addCategory", adminController.addCategory)
router.get("/addSubCategory", adminController.addSubCategory)
router.get("/categoryView/:id", adminController.categoryView)
router.get("/subCategoryView/:id", adminController.subCategoryView)
router.get("/editCategory/:id", adminController.editCategory)
router.get("/editSubCategory/:id", adminController.editSubCategory)
router.get("/booking", adminController.booking)
router.get("/doctor", adminController.doctor)
router.get("/patient", adminController.patient)
router.get("/addDoctor", adminController.addDoctor)


////////////////user//////////////////
router.post("/signup", userController.signup)
// router.get("/getUser",  userController.getUser)
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
// router.get("/TermC", cmsController.TermC)
// router.get("/privacyP", cmsController.privacyP)
// router.get("/aboutUs", cmsController.aboutUs)
router.post("/updateTermCms", cmsController.updateTermCms)
router.post("/updatePrivacyCms", cmsController.updatePrivacyCms)
router.post("/updateAboutCms", cmsController.updateAboutCms)

///////////category controller//////
router.post("/createCategory", controllers.createCategory)
router.get("/getCategory", controllers.getCategory)
router.get("/findSingleCategory/:id", controllers.findSingleCategory)
router.post("/updateCategory", controllers.updateCategory)
router.post("/deleteCategory", controllers.deleteCategory)

///////////subCategory controller//////
router.post("/addSubCategory", controllerss.addSubCategory)
router.get("/getSubCategory", controllerss.getSubCategory)
router.get("/findSingleSubCategory/:id", controllerss.findSingleSubCategory)
router.post("/updateSubCategory", controllerss.updateSubCategory)
router.post("/deleteSubCategory", controllerss.deleteSubCategory)

///////////////////////////booking//////////////////
router.post("/createBoking", bokingControler.createBoking)
router.get("/getBoking", bokingControler.getBoking)
router.get("/getSingleBoking/:id", bokingControler.getSingleBoking)
router.get("/bookingView/:id", adminController.bookingView)

////////////////////////////doctor///////////////////
router.post("/addDoctor", bokingControler.addDoctor)
router.post("/getdoctor_data",bokingControler.getdoctor_data);
router.post("/getDoctor", bokingControler.getDoctor)
router.post("/getPatient", bokingControler.getPatient)

router.get("/doctorView/:id", adminController.doctorView)
router.post("/addPatient", bokingControler.addPatient)



module.exports = router;

var express = require('express');
var router = express.Router();
const adminController = require("../controller/adminController");
const userController = require("../controller/userController")


////////////////////////////////admin///////////////
router.get("/dashboard",adminController.dashboard)
router.post("/login",adminController.login)
router.get("/changePassword",adminController.changePassword)


router.get("/signup_page",adminController.signup_page)




////////////////user//////////////////
router.post("/signup",userController.signup)
router.get("/getUser",userController.getUser)
router.get("/getSingleUser/:id",userController.getSingleUser)
router.put("/updateUser/:id",userController.updateUser)
router.delete("/deleteUser/:id",userController.deleteUser)





module.exports = router;

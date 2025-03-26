const express= require("express");
const router=express.Router();
const authcontroller=require("../controllers/auth-controller");
const signupSchema=require("../validators/auth-validators");
const validate=require("../middlewares/validate-middleware");

router.route("/").get(authcontroller.home);
// router.get("/register",(req,res)=>{
//     res.status(200).send("this is registration page");
// })
router.route("/registration").post(validate(signupSchema),authcontroller.registration);
router.route("/verifyemail").post(authcontroller.verifyemail);
router.route("/login").post(authcontroller.login);
router.route("/teacherRegistration").post(authcontroller.teacherRegistration);
router.route("/teacherLogin").post(authcontroller.teacherLogin);
router.route("/forgotPassword").post(authcontroller.forgotPassword);
router.route("/resetPassword/:token").post(authcontroller.resetPassword);
router.route("/getStudentDetails").get(authcontroller.getStudentDetails)
module.exports= router;
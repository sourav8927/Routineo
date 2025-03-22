const User=require("../models/user-model");
const Teacher=require("../models/teacher-model");
const jwt= require("jsonwebtoken");
const {SendVerificationCode,WelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail}=require("../middlewares/Email");
const crypto = require("crypto");
const bcrypt=require("bcryptjs");

const home=async(req,res)=>{
    try {
        res.status(200).send("home page");
    } catch (error) {
        console.log(error);
    }
}
//student registration & login
const registration=async(req,res)=>{
    try {
        console.log("register",req.body);
        const {username,roll,registrationNo,phone,email,password,currentyear,semester,department}=req.body;

        const userExist=await User.findOne({email});

        if(userExist){
            return res.status(400).json({messege:"Email already exist"});
        }

        const verificationCode= Math.floor(100000+Math.random()*900000).toString();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userCreated=await User.create({
            username,roll,registrationNo,phone,email,password:hashedPassword,currentyear,semester,department,verificationCode
        });
        SendVerificationCode(userCreated.email,verificationCode);
        return res.status(201).json({msg:"Registration successfully",token:await userCreated.generateToken(),userId:userCreated._id.toString()});
    } catch (error) {
        res.status(500).json({msg:"Internal server error"});
    }
}
//student email verification 
const verifyemail=async(req,res)=>{
    try {
        const {code}=req.body;
        const user= await User.findOne({
            verificationCode:code
        });
        if(!user){
            return res.status(400).json({success:false, messege:"Invalid or Expired Code"});
        }
        user.isVerified=true,
        user.verificationCode=undefined;
        await user.save();
        await WelcomeEmail(user.email,user.username);
        return res.status(200).json({success:true, messege:"verified"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal server error"});
    }
}
// const login= async(req,res)=>{
//     try {
//         const {email,password}=req.body;
//         const userExist=await User.findOne({email});
//         if(!userExist){
//             return res.status(401).json({messege:"Invalid credentials"});
//         }

//         const user=await userExist.comparePassword(password);

//         if(user){
//            return res.status(200).json({messege:"Login successfully",token:await userExist.generateToken(),userId:userExist._id.toString()});
//         }else{
//            return res.status(401).json({messege:"Invalid Email or Password"});
//         }
//     } catch (error) {
//         res.status(500).json({msg:"Internal server error"});
//     }
// }

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (!userExist) {
            console.log("User not found for email:", email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await userExist.comparePassword(password);
        if (!isPasswordValid) {
            console.log("Password mismatch for email:", email);
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        const token = await userExist.generateToken();

        res.status(200).json({
            message: "Login successful",
            token: token,
            userId: userExist._id.toString(),
        });
    } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


//Teacher registration & login
const teacherRegistration=async(req,res)=>{
    try {
        console.log("teacherRegister",req.body);
        const {username,teacherId,email,password}=req.body;

        const userExist=await Teacher.findOne({email});

        if(userExist){
            return res.status(400).json({messege:"Email already exist"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userCreated=await Teacher.create({
            username,teacherId,email,password:hashedPassword 
        });
        return res.status(201).json({msg:"Registration successfully",token:await userCreated.generateToken(),userId:userCreated._id.toString()});
    } catch (error) {
        res.status(500).json({msg:"Internal server error"});
    }
}

const teacherLogin= async(req,res)=>{
    try {
        const {email,password}=req.body;
        const userExist=await Teacher.findOne({email});

        if(!userExist){
            return res.status(401).json({messege:"Invalid credentials"});
        }

        const user=await userExist.comparePassword(password);

        if(user){
           return res.status(200).json({messege:"Login successfully",token:await userExist.generateToken(),userId:userExist._id.toString()});
        }else{
           return res.status(401).json({messege:"Invalid Email or Password"});
        }
    } catch (error) {
        res.status(500).json({msg:"Internal server error"});
    }
}
const forgotPassword=async(req,res)=>{
    const {email}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,messege:"User not found"});
        }
        const resetPasswordToken=crypto.randomBytes(32).toString("hex");
        const resetPasswordExpairesAt=Date.now()+1*60*60*1000; //1 hour

        user.resetPasswordToken=resetPasswordToken;
        user.resetPasswordExpairesAt=resetPasswordExpairesAt;

        await user.save();
        await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/resetPassword/${resetPasswordToken}`);

        res.status(200).json({success:true,messege:"Password reset email sent successfully"});
    } catch (error) {
        console.log("error sending password reset email", error);
        res.status(400).json({success:false,messege:error.messege});
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Find the user with the reset token and ensure the token is not expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpairesAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, messege: "Invalid or expired reset token" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the user's password and clear the reset token/expiry
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpairesAt = undefined;

        await user.save();

        // Send a success email to the user
        await sendResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.log("error resetting password", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports={home,registration,login,teacherRegistration,teacherLogin,verifyemail,forgotPassword,resetPassword}
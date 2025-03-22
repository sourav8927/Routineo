const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken");
const userSchema= new mongoose.Schema({

    username:{
        type:String,
        require:true,
    },

    roll:{
        type:String,
        require:true,
    },

    registrationNo:{
        type:String,
        require:true,
    },

    phone:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    currentyear:{
        type:String,
        require:true,
    },
    semester:{
        type:String,
        require:true,
    },
    department:{
        type:String,
        require:true,
    },
    isCr:{
        type:Boolean,
        default: false,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    verificationCode:String,
    resetPasswordToken:String,
    resetPasswordExpairesAt: Date
},{timestamps:true});

// userSchema.pre('save',async function(next){
//     console.log("pre method:",this);
//     const user=this;

//     if(!user.isModified('password')){
//         return next();
//     }
//     try {
//         const salt=await bcrypt.genSalt(10);
//         const hash_password=await bcrypt.hash(user.password.trim(),salt);
//         user.password=hash_password;
//     } catch (error) {
//         next(error);
//     }
// });
userSchema.methods.comparePassword = async function (inputPassword) {
    // return bcrypt.compare(password,this.password);
    try {
        console.log("Input Password:", inputPassword);
        console.log("Stored Hashed Password:", this.password);
        const isMatch = await bcrypt.compare(inputPassword, this.password);
        console.log("Password Match:", isMatch);
        return isMatch;
    } catch (error) {
        console.error("Error in comparePassword:", error);
        return false;
    }
};

userSchema.methods.generateToken= async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"7d",
        }
    );
    } catch (error) {
        console.error(error);
    }
}
const User= new mongoose.model("User",userSchema);

module.exports= User;
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken");
const teacherSchema= new mongoose.Schema({

    username:{
        type:String,
        require:true,
    },
    teacherId:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
    resetPasswordToken:String,
    resetPasswordExpairesAt: Date
},{timestamps:true});

teacherSchema.pre('save',async function(next){
    console.log("pre method:",this);
    const teacher=this;

    if(!teacher.isModified('password')){
        next();
    }
    try {
        const salt=await bcrypt.genSalt(10);
        const hash_password=await bcrypt.hash(teacher.password,salt);
        teacher.password=hash_password;
    } catch (error) {
        next(error);
    }
});

teacherSchema.methods.comparePassword= async function(password){
    return bcrypt.compare(password,this.password);
}
teacherSchema.methods.generateToken= async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"30d",
        }
    );
    } catch (error) {
        console.error(error);
    }
}
const Teacher= new mongoose.model("Teacher",teacherSchema);

module.exports= Teacher;
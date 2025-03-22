const {Verification_Email_Template,Welcome_Email_Template} = require("../libs/EmailTemplate");
const transporter=require("./Email.config");

const SendVerificationCode=async(email,verificationCode)=>{
    try {
        const response = await transporter.sendMail({
            from: '"UIT IT department" <uitofficials2025@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verify your Email", // Subject line
            text: "Verify your Email", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode), // html body
          });
          console.log("Email send successfully",response);
    } catch (error) {
        console.log("Email error");
    }
  };

  const WelcomeEmail=async(email,username)=>{
    try {
        const response = await transporter.sendMail({
            from: '"UIT IT department" <uitofficials2025@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "IT Routineo Welcome Email!", // Subject line
            text: "Welcome Email", // plain text body
            html: Welcome_Email_Template.replace("{username}",username), // html body
          });
          console.log("Email send successfully",response);
    } catch (error) {
        console.log("Email error")
    }
  };

  const sendPasswordResetEmail=async(email,resetURL)=>{
    try {
      const response = await transporter.sendMail({
          from: '"UIT IT department" <uitofficials2025@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Reset your Routineo password", // Subject line
          text: "Reset your password", // plain text body
          html:`Click <a href="${resetURL}">here</a> to reset your password.`, // html body
        });
        console.log("Email send successfully",response);
  } catch (error) {
      console.log("Email sending password reset email")
  }

  };

  const sendResetSuccessEmail= async(email)=>{
    try {
      const response = await transporter.sendMail({
          from: '"UIT IT department" <uitofficials2025@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Password Reset was successful", // Subject line
          text: "Password reset successfully", // plain text body
          html:`Your password was reset successfully`, // html body
        });
        console.log("Email send successfully",response);
  } catch (error) {
      console.log("Error sending password reset successful email",error);
  }

  }
  module.exports={SendVerificationCode,WelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail};
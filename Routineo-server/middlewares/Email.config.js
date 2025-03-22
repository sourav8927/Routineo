const nodemailer=require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "uitofficials2025@gmail.com",
      pass: "fcti rznt qvgl pdmz",
    },
  });

  // const SendEmail=async()=>{
  //   try {
  //       const info = await transporter.sendMail({
  //           from: '"UIT IT department" <uitofficials2025@gmail.com>', // sender address
  //           to: "souravkarmakar8927@gmail.com", // list of receivers
  //           subject: "Hello ✔", // Subject line
  //           text: "Hello world?", // plain text body
  //           html: "<b>Hello world?</b>", // html body
  //         });
  //         console.log(info)
  //   } catch (error) {
  //       console.log(error)
  //   }
  // }

  // SendEmail()
  module.exports= transporter;
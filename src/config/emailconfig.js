const nodemailer=new require("nodemailer");

const {GMAIL_EMAIL,GMAIL_PASS} =require("./server-config")

const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth: {
      user: GMAIL_EMAIL,
      pass: GMAIL_PASS,
    },
  });

module.exports=transporter;
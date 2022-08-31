const axios = require("axios");
const invite = require("../model/invite");
require("../config/database").connect();
const router = require("express").Router();

router.post("/invite", async (req, res) => {
  const { email, waiver, revenueshare, deliverables } = req.body;

  const data = {
    email,
    waiver,
    revenueshare,
    deliverables,
  };

  invite.create(data, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      ("use strict");
      const nodemailer = require("nodemailer");

      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        var transporter =   nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'agencyvault7@gmail.com',
                pass: process.env.GMAIL
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"VaultIndustria👻" <foo@example.com>', // sender address
          to: email, // list of receivers
          subject: "Link for registration ✔", // Subject line
          text: 'http://localhost:3000/user-agreement', // plain text body
          html: `<b>Follow the link to register:</b>
          <a href=${'http://localhost:3000/user-agreement'}/>Register</a>
          `, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }

      main().catch(console.error);

      res.send(result);
    }
  });
});

router.get("/pending",async(req,res)=>{
    invite.find({},function(err,result){
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }

    })
})

module.exports = router;

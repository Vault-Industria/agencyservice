require("../config/database").connect();
const router = require("express").Router();
const artist = require("../model/artist");
const nodemailer = require("nodemailer");


router.post("/set-artist", async (req, res) => {
    const {artType,user_name,user_email,user_linkedin,user_phone,user_port,user_port1,user_other} = req.body;

    let data = {artType,user_name,user_email,user_linkedin,user_phone,user_port,user_port1,user_other};

    ("use strict");
        
  
        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
         
  
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
            from: '"VaultIndustria👻" <agencyvault7@gmail.com>', // sender address
            to: user_email, // list of receivers
            subject: "Vault Industria | Curatorial Review In Progress", // Subject line
            text: `
            Hello,

            My name is Nano, Art Advisor at Vault Industria. 
            I review every art submission carefully and thoroughly and look forward to exploring your portfolio.
            As you may know, we are a new company and are amazed by the astounding submissions we have received, 
            like your own.
            Thanks for your patience as we review your work.
            
            Nano
            {Image of Nano's signature}
            ART ADVISOR`, // plain text body
            // html: `<b>Follow the link to register:</b>
            // <a href=${'http://localhost:3001/user-agreement'}/>Register</a>
            // `, // html body
          });
  
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }
    artist.create(data, function (err, result) {
        if (err) {
          res.send(err);
        } else {
          
          res.send(result);
          main().catch(console.error);
        }
      });

});

router.get("/artist-details", async (req,res) =>{
    
    artist.find({"review":false},function(err, result){
        if(err){
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.get("/artist-approved", async (req,res) =>{
    
    artist.find({"review":true},function(err, result){
        if(err){
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.post("/invite", async (req, res) => {
    const { email } = req.body;
  
   
  
  
        ("use strict");
        
  
        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
         
  
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
            from: '"VaultIndustria👻" <agencyvault7@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Vault Industria | Curatorial Review In Progress", // Subject line
            text: `
            Hello,

            My name is Nano, Art Advisor at Vault Industria. 
            I review every art submission carefully and thoroughly and look forward to exploring your portfolio.
            As you may know, we are a new company and are amazed by the astounding submissions we have received, 
            like your own.
            Thanks for your patience as we review your work.
            
            Nano
            {Image of Nano's signature}
            ART ADVISOR`, // plain text body
            // html: `<b>Follow the link to register:</b>
            // <a href=${'http://localhost:3001/user-agreement'}/>Register</a>
            // `, // html body
          });
  
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }
        const filter = { user_email:email };
        const update = { review: true };

        artist.findOneAndUpdate(filter,update,function(err, result){
            if(err){
                res.send(err);
            } else {
                res.send(result);
                main().catch(console.error);
            }
        });
  
       
  
      
   
  });

module.exports = router;
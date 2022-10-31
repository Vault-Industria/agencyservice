const axios = require("axios");
const invite = require("../model/invite");
require("../config/database").connect();
const router = require("express").Router();

router.post("/invite", async (req, res) => {
  const { email, waiver, revenueshare, deliverables,role } = req.body;

  const data = {
    email,
    waiver,
    revenueshare,
    deliverables,
    role
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
          subject: "Link for registration ✔", // Subject line
          text: 'http://localhost:3001/user-agreement', // plain text body
          html: `<b>Follow the link to register:</b>
          <a href=${'http://localhost:3001/user-agreement'}/>Register</a>
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

router.post("/verify",async(req,res)=>{
  const {email}=req.body
  invite.find({email:email},function(err,result){
      if(err){
          res.send(err)
      }else{
          res.send(result)
      }

  })
})
const Stripe = require("stripe")
const stripe = new Stripe(process.env.SECRET)
router.post("/subscribe",async(req,res)=>{
 
  const {email,name,paymentMethod} = req.body
  try {
  
    //Create a customer
    const customer =  await stripe.customers.create({
      email,
      name,
      payment_method:paymentMethod,
      invoice_settings:{default_payment_method:paymentMethod},
    });

    const product = await stripe.products.create({
      name:"Monthly subscription"
    });

    //create subscription
    const subscription = await stripe.subscriptions.create({
      customer:customer.id,
      items:[
        {
          price_data:{
            currency:"USD",
            product:product.id,
            unit_amount:"5000",
            recurring:{
              interval:"month"
            }
          }
        }
      ],
      payment_settings:{
        payment_method_types:['card'],
        save_default_payment_method:"on_subscription",

      },
      expand:['latest_invoice.payment_intent']
    });

    //send back client secret
    res.json({
      message:'Subscription successful',
      clientSecret:subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId:subscription.id
    });

  }catch(err){
    console.log(err);
    res.json({message:"Internal server error"});
  }
});

router.post("/creatorsubscribe",async(req,res)=>{
 
  const {email,name,paymentMethod} = req.body
  try {
  
    //Create a customer
    const customer =  await stripe.customers.create({
      email,
      name,
      payment_method:paymentMethod,
      invoice_settings:{default_payment_method:paymentMethod},
    });

    const product = await stripe.products.create({
      name:"Monthly subscription"
    });

    //create subscription
    const subscription = await stripe.subscriptions.create({
      customer:customer.id,
      items:[
        {
          price_data:{
            currency:"USD",
            product:product.id,
            unit_amount:"500",
            recurring:{
              interval:"month"
            }
          }
        }
      ],
      payment_settings:{
        payment_method_types:['card'],
        save_default_payment_method:"on_subscription",

      },
      expand:['latest_invoice.payment_intent']
    });

    //send back client secret
    res.json({
      message:'Subscription successful',
      clientSecret:subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId:subscription.id
    });

  }catch(err){
    console.log(err);
    res.json({message:"Internal server error"});
  }
})


module.exports = router;

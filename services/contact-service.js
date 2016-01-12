var nodemailer = require('nodemailer');
var errorHandler = require('../services/error-service');
/**
 * Send an email when the contact from is submitted
 */
exports.sendMailYunNM = function(){
    return function(req,res){
    console.log("ContactService");
    var contactName = req.body.contactName;
    var contactEmail = req.body.contactEmail;
    var contactMsg = req.body.contactMsg;
    var to = 'mingukwon.com@gmail.com';
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.Yun_User,
            pass: process.env.Yun_Pass
        }
    });
    console.log('!! ' + contactEmail +' '+contactName +' '+contactMsg +' ');
    var mailOptions = {
        from: contactEmail,
        to: to, 
        subject: contactName+' | new message !',
        text: contactMsg
    };
    transporter.sendMail(mailOptions, function (err, info){
        if(err){
                  return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
        }
        else{
        res.send({
            message: 'Thank you for your comment!'
          });
        }
        console.log('Message sent: ' + info.response);

    });
    }
};
var nodemailer = require('nodemailer');
var errorHandler = require('../services/error-service');
var config = require('../config');

/**
 * Send an email when the contact from is submitted
 */
exports.sendMail = function(){
    return function(req,res){
    console.log("ContactService");
    var contactName = req.body.contact.contactName;
    var contactEmail = req.body.contact.contactEmail;
    var contactMsg = req.body.contact.contactMsg;
    var to = req.body.to;
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.yunUser,
            pass: config.yunPass
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
var nodemailer = require('nodemailer');
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
            user: 'mingukwon.com@gmail.com',
            pass: 'mingoo90'
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
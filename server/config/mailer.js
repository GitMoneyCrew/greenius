var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
if(!process.env.DEPLOYED) {
	var config = require('./../env/config.js');
}

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: {
    user: 'greenius.thesis@gmail.com',
    pass: process.env.NODEMAILER_PASSWORD || config.NODEMAILER_PASSWORD
  }
}));


exports.sendMail = function(receiverEmail){
  var mailOptions = {
    from: 'greenius.thesis@gmail.com',
    to: receiverEmail,
    subject: 'I need water!!',
    text: 'One of the plants in your gardens needs to be watered!',
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent:' + info.response + '\n');
  });
};

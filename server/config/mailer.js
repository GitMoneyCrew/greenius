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

exports.signUpMail = function(receiverEmail) {
  var mailOptions = {
    from: 'greenius.thesis@gmail.com',
    to: receiverEmail,
    subject: 'Welcome to Greenius',
    text: 'Welcome to Greenius',
    html: '<h4>Dear Future Gardener, <br> Thanks for joining the greenius community. Have fun gardening!<br> Love, the Greenius Team!</h4>',
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      return console.log(error);
    }
    console.log('Message sent:' + info.response + '\n');
  });
}
exports.plantMail = function(receiverEmail) {
  var mailOptions = {
    from: 'greenius.thesis@gmail.com',
    to: receiverEmail,
    subject: 'I need water!!',
    text: 'One of the plants in your gardens needs to be watered! Checkout our website www.greenius.io to see which one.',
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      return console.log(error);
    }
    console.log('Message sent:' + info.response + '\n');
  });
};

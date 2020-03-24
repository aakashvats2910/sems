const register = document.querySelector('#sign-up');
const form = document.querySelector('#form');



register.addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.querySelector('#username');
    const pass = document.querySelector('#pass');
    const roll = document.querySelector('#roll');
    const mobile = document.querySelector('#mobile');
    const form = document.querySelector('#form');
    const mess = document.querySelector('#mess');

    var nodemailer = require('nodemailer');  

    console.log('Button clicked!');
    // sendEmail();
    console.log('SENT!');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'semsmmu@gmail.com',
            pass: 'password@sems'
        }
    });

    var mailOptions = {
        from: 'semsmmu@gmail.com',
        to: 'aakashvats2910@gmail.com',
        subject: '"OTP verification by SEMS',
        text: 'The OTP for verification of your email is 123456. Do not share tis with anyone.'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


});

function sendEmail() {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "semsmmu@gmail.com",
        Password: "password@sems",
        To: 'aakashvats2910@gmail.com',
        From: "semsmmu@gmail.com",
        Subject: "OTP verification by SEMS",
        Body: "The OTP for verification of your email is 123456. Do not share tis with anyone.",
    }).then(
        message => alert("mail sent successfully")
    );
}



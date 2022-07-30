const express = require('express')
const ejs = require('ejs')
const path = require('path')
require("dotenv").config();
const PORT = 3000
const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'view'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// MAIL CONFIG
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    },

});
// END

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/send', (req, res) => {
    const mailOptions = {
        from: process.env.FROM, // sender address
        to: req.body.email, // list of receivers
        subject: req.body.subject, // Subject line
        html: '<p>' + req.body.message + '</p>' // plain text body
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            res.render('sent', { message: `Email sent successfully to ${req.body.email}` })
    });
})
app.listen(PORT, () => {
    console.log(`Server is running on port http://127.0.0.1:${PORT}`)
})
// imports
const express = require('express');
const nodemailer = require("nodemailer");
const app = express();

const port = 9000;

// static files
app.use(express.static('public'));
app.use(express.json());
app.use('/js', express.static(__dirname+'public/js'));
app.use('/css', express.static(__dirname+'public/css'));
app.use('/icons', express.static(__dirname+ 'public/icons'));
app.use('/images', express.static(__dirname+ 'public/images'));

// views
app.set('views', './views');
app.set('view engine', 'ejs');
// console.log(process.env.bearer_mail);
// console.log(process.env.bearer_password);
// console.log(process.env);

app.get(['/', '/about', '/resume', '/portfolio', '/contact'], (req, res) => {
    let selection = req.path.slice(1).length ? req.path.slice(1) : 'about';
    res.render('home', {internal_nav_selection: selection});
});

app.post('/mail_forward', function (req, res) {
    console.log(req.body);
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let sender_email = req.body.sender_email;
    let sender_message = req.body.sender_message;

    const padmakumar_email = "padmakumar.ks@icloud.com";
    const server_email = "ipadmakumar2k21@gmail.com";
    const server_pwd = "nrgdugxotfhahanz";
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: server_email,
            pass: server_pwd
        }
    });

    const mailOptions = {
        from: server_email,
        to: padmakumar_email,
        subject: 'ipadmakumar.com received a message',
        text: `Name: ${first_name} ${last_name}\nEmail: ${sender_email}\n\nMessage: ${sender_message}`
    };

    console.log("got mailOptions: ", mailOptions);

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            console.log('Sorry, something went wrong, please try again later!');
            res.send('failed');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('ok');
        }
    });

    res.send('ok');
    res.end();
});

app.listen(port, () => console.info(`listening on port ${port}`));

// imports
const express = require('express');
const app = express();
const path = require('path');

const port = 9000;

// static files
app.use(express.static('public'));
app.use('/css/', express.static(__dirname+'public/css'));
app.use('/icons/', express.static(__dirname+ 'public/icons'));
app.use('/images/', express.static(__dirname+ 'public/images'));
app.use('/scripts/', express.static(__dirname+'public/scripts'));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

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

app.get('/demo3d', (req, res) => {
    res.render('demo3d');
});

app.listen(port, () => console.info(`listening on port ${port}`));
